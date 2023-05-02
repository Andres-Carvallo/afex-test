import { defineStore } from "pinia";
import youtubeServices from "../services/yotube.service";

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
    async setYoutubeDetails() {
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
      await this.getYoutubeVideoInfo().then((response) => {
        if (response !== null) {
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
      const videoInfo = {
        id: this.youtubeList.length + 1,
        url: url,
      };
      this.youtubeList.push(videoInfo);
      this.flags.clearInput = true;
    },
    deleteYoutubeVideo({ videoDbId }) {
      this.youtubeList = this.youtubeList.filter(
        (video) => video.id !== videoDbId
      );
    },
    setVideoDetails({ videoId }) {
      const videoDetails = this.youtubeListInfo.find(
        (video) => video.id === videoId
      );
      this.mainVideoInfo = videoDetails;
      return this.mainVideoInfo;
    },
    async getYoutubeVideoInfo() {
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
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return responseList;
    },
  },
});
