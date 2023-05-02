import { defineStore } from "pinia";
import youtubeServices from "../services/yotube.service";

export const useCatalogueStore = defineStore("catalogue", {
  state: () => ({
    mainVideoInfo: null,
    youtubeList: null,
    youtubeListInfo: null,
    flags: {
      clearInput: false,
    },
  }),
  getters: {
    getYoutubeDbList: (state) => state.youtubeList,
    getYoutubeInfoList: (state) => state.youtubeListInfo,
    getYoutubeDetailInfo: (state) => state.mainVideoInfo,
    getClearInputFlag: (state) => state.flags.clearInput,
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
    },
    setClearInputFlag({ boolean }) {
      this.flags.clearInput = boolean;
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
          return {
            id: video.id,
            videoId: video.url.split("watch?v=")[1].split("&ab_channel=")[0],
          };
        }
        if (video.url.includes("youtu.be")) {
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
      const videoIdList = mainVideoList.map((info) => {
        return info.videoId;
      });
      await youtubeServices
        .getYouTubeApi(videoIdList)
        .then((response) => {
          this.youtubeListInfo = response.data.items;
          responseList = response.data.items;
          const fullYoutubeList = this.youtubeListInfo.map((info) => {
            const source = {
              dbId: mainVideoList.find((video) => video.videoId === info.id).id,
            };
            const newList = Object.assign(info, source);
            return newList;
          });
          return fullYoutubeList;
        })
        .catch((error) => {
          console.log(error);
        });
      return responseList;
    },
  },
});
