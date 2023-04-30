import { defineStore } from "pinia";
import youtubeServices from "../services/yotube.service";

export const useCatalogueStore = defineStore("catalogue", {
  state: () => ({
    mainVideoInfo: null,
    youtubeList: [
      "https://www.youtube.com/watch?v=5la4Ld3hwhI&ab_channel=KEXP",
      "https://www.youtube.com/watch?v=T8XiUrpn6u4&ab_channel=STAGES",
      "https://www.youtube.com/watch?v=NmxFxBiCrL4&ab_channel=GhostBCVEVO",
      "https://youtu.be/ce3J_f_rAbk",
      "https://www.youtube.com/watch?v=jYk3aqtzjwk&ab_channel=Skithuvudet",
    ],
    youtubeListInfo: null,
    flags: {
      clearInput: false,
    },
  }),
  getters: {
    getYoutubeInfoList: (state) => state.youtubeListInfo,
    getYoutubeDetailInfo: (state) => state.mainVideoInfo,
    getClearInputFlag: (state) => state.flags.clearInput,
  },
  actions: {
    setClearInputFlag({ boolean }) {
      this.flags.clearInput = boolean;
    },
    setYoutubeVideo({ url }) {
      this.youtubeList.push(url);
      this.flags.clearInput = true;
      this.getYoutubeVideoInfo();
    },
    setVideoDetails(videoId) {
      const videoDetails = this.youtubeListInfo.find(
        (video) => video.id === videoId
      );
      this.mainVideoInfo = videoDetails;
      return this.mainVideoInfo;
    },
    async getYoutubeVideoInfo() {
      const videoIdList = this.youtubeList.map((videoUrl) => {
        if (
          videoUrl.includes("watch?v=") &&
          videoUrl.includes("&ab_channel=")
        ) {
          return videoUrl.split("watch?v=")[1].split("&ab_channel=")[0];
        }
        if (videoUrl.includes("youtu.be")) {
          return videoUrl.split("https://youtu.be/")[1];
        }
      });
      await youtubeServices
        .getYouTubeApi(videoIdList)
        .then((response) => {
          this.youtubeListInfo = response.data.items;
          return this.youtubeListInfo;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
