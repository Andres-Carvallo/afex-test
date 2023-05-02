import { defineStore } from "pinia";
import youtubeServices from "../services/yotube.service";
import { useFirestore } from "vuefire";
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";

export const useCatalogueStore = defineStore("catalogue", {
  state: () => ({
    mainVideoInfo: null,
    youtubeList: null,
    youtubeListInfo: null,
    videosArray: null,
    flags: {
      clearInput: false,
      snackbar: {
        type: null,
        status: false,
        text: null,
      },
    },
  }),
  getters: {
    getYoutubeDbList: (state) => state.youtubeList,
    getYoutubeInfoList: (state) => state.youtubeListInfo,
    getYoutubeDetailInfo: (state) => state.mainVideoInfo,
    getClearInputFlag: (state) => state.flags.clearInput,
    getSnackbarFlag: (state) => state.flags.snackbar,
    getvideosArray: (state) => state.videosArray,
  },
  actions: {
    setYoutubeDbList({ videoList }) {
      const VideoFormattedList = Object.entries(videoList).map((video) => {
        return {
          id: parseInt(video[0]),
          url: video[1],
        };
      });
      this.youtubeList = VideoFormattedList;
      this.setYoutubeDetails();
    },
    async setYoutubeDetails(url) {
      function getVideoDuration(videoDuration) {
        if (videoDuration.includes("H")) {
          return videoDuration.split("PT")[1].split("H")[0] + "hrs";
        }
        if (!videoDuration.includes("M")) {
          return "00" + ":" + videoDuration.split("PT")[1].split("S")[0];
        }
        return (
          videoDuration.split("PT")[1].split("M")[0] +
          ":" +
          videoDuration.split("M")[1].split("S")[0]
        );
      }
      await this.getYoutubeVideoInfo(url).then((response) => {
        if (response) {
          const videoDetailsList = response;
          const videoListArray = videoDetailsList.map((video) => {
            return {
              dbId: video.dbId,
              id: video.id,
              thumbnail: video.snippet.thumbnails.default.url,
              duration: getVideoDuration(video.contentDetails.duration),
            };
          });
          this.videosArray = videoListArray;
          return videoListArray;
        }
        return null;
      });
    },
    clearInputFlag({ boolean }) {
      this.flags.clearInput = boolean;
    },
    setSnackbarFlag({ snackbarObject }) {
      this.flags.snackbar = snackbarObject;
    },
    clearSnackbarFlag() {
      this.flags.snackbar = {
        type: null,
        status: false,
        text: null,
      };
    },
    setYoutubeVideo({ url }) {
      const videoInList = this.youtubeList.find((video) => video.url === url);
      if (!videoInList) {
        const dbListSorted = this.getYoutubeDbList.sort((a, b) => a.id - b.id);
        console.log(dbListSorted.slice(-1)[0].id);
        const newId = dbListSorted.slice(-1)[0].id + 1;
        const videoInfo = {
          id: newId,
          url: url,
        };
        this.youtubeList.push(videoInfo);
        this.flags.clearInput = true;
        return this.setYoutubeDetails(url);
      }
      const snackbarObject = {
        type: "error",
        status: true,
        text: "Ya tienes este video en tu lista",
      };
      return this.setSnackbarFlag({ snackbarObject });
    },
    deleteYoutubeVideo({ videoDbId }) {
      const db = useFirestore();
      const listRef = doc(db, "youtube-list", "videos");
      const fieldToDelete = {};
      const fieldId = videoDbId;
      fieldToDelete[fieldId] = deleteField();
      updateDoc(listRef, fieldToDelete)
        .then(() => {
          console.log(videoDbId);
          this.youtubeList = this.youtubeList.filter(
            (video) => video.id !== videoDbId
          );
          const snackbarObject = {
            type: "success",
            status: true,
            text: "Video eliminado con éxito",
          };
          this.setSnackbarFlag({ snackbarObject });
        })
        .catch(() => {
          const snackbarObject = {
            type: "error",
            status: true,
            text: "Ha ocurrido un error con Firebase",
          };
          return this.setSnackbarFlag({ snackbarObject });
        });
    },
    setVideoDetails({ videoId }) {
      const videoDetails = this.youtubeListInfo.find(
        (video) => video.id === videoId
      );
      this.mainVideoInfo = videoDetails;
      return this.mainVideoInfo;
    },
    async getYoutubeVideoInfo(url) {
      let responseList;
      const mainVideoList = await this.youtubeList.map((video) => {
        if (
          video.url.includes("watch?v=") &&
          video.url.includes("&ab_channel=")
        ) {
          if (video.url.includes("&t=")) {
            return {
              id: video.id,
              videoId: video.url
                .split("watch?v=")[1]
                .split("&ab_channel=")[0]
                .split("&t=")[0],
            };
          }
          return {
            id: video.id,
            videoId: video.url.split("watch?v=")[1].split("&ab_channel=")[0],
          };
        }
        if (video.url.includes("youtu.be")) {
          if (video.url.includes("?t=")) {
            return {
              id: video.id,
              videoId: video.url.split("https://youtu.be/")[1].split("?t=")[0],
            };
          }
          return {
            id: video.id,
            videoId: video.url.split("https://youtu.be/")[1],
          };
        }
        if (
          video.url.includes("watch?v=") &&
          !video.url.includes("&ab_channel=")
        ) {
          return {
            id: video.id,
            videoId: video.url.split("watch?v=")[1],
          };
        }
      });
      const videoIdList = await mainVideoList.map((info) => {
        return info.videoId;
      });
      if (
        (this.youtubeList && this.youtubeListInfo === null) ||
        this.youtubeList.length !== this.youtubeListInfo.length
      ) {
        await youtubeServices
          .getYouTubeApi(videoIdList)
          .then((response) => {
            if (response.data.items.length === this.youtubeList.length) {
              if (url) {
                const db = useFirestore();
                const videoRef = doc(db, "youtube-list", "videos");
                const videoObject = {};
                const dbListSorted = this.getYoutubeDbList.sort(
                  (a, b) => a.id - b.id
                );
                const lastId = dbListSorted.slice(-1)[0].id;
                videoObject[lastId] = url;
                setDoc(videoRef, videoObject, { merge: true })
                  .then(() => {
                    const snackbarObject = {
                      type: "success",
                      status: true,
                      text: "Video guardado con éxito",
                    };
                    this.setSnackbarFlag({ snackbarObject });
                  })
                  .catch(() => {
                    const snackbarObject = {
                      type: "error",
                      status: true,
                      text: "Ha ocurrido un error con Firebase",
                    };
                    return setSnackbarFlag({ snackbarObject });
                  });
              }
              this.youtubeListInfo = response.data.items;
              responseList = response.data.items;
              const fullYoutubeList = this.youtubeListInfo.map((info) => {
                const source = {
                  dbId: mainVideoList.find((video) => video.videoId === info.id)
                    .id,
                };
                const newList = Object.assign(info, source);
                return newList;
              });
              return fullYoutubeList;
            } else {
              this.youtubeList.pop();
              const snackbarObject = {
                type: "error",
                status: true,
                text: "Video no existe",
              };
              this.setSnackbarFlag({ snackbarObject });
            }
          })
          .catch((error) => {
            const snackbarObject = {
              type: "error",
              status: true,
              text: error,
            };
            this.setSnackbarFlag({ snackbarObject });
          });
      }
      return responseList;
    },
  },
});
