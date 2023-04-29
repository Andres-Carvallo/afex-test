import { defineStore } from "pinia";
import youtubeServices from "../services/yotube.service";

export const useCatalogueStore = defineStore("catalogue", {
  state: () => ({
    youtubeList: [
      "https://www.youtube.com/watch?v=5la4Ld3hwhI&ab_channel=KEXP",
      "https://www.youtube.com/watch?v=5la4Ld3hwhI&ab_channel=KEXP",
      "https://www.youtube.com/watch?v=5la4Ld3hwhI&ab_channel=KEXP",
    ],
    youtubeListInfo: null,
  }),
  getters: {
    getYoutubeInfoList: (state) => state.youtubeListInfo,
  },
  actions: {
    setYoutubeVideo({ link }) {
      this.youtubeList.push(link);
    },
    async getYoutubeVideoInfo() {
      await youtubeServices
        .getYouTubeApi(["xUkeB99Sy_c", "5la4Ld3hwhI", "5la4Ld3hwhI"])
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
