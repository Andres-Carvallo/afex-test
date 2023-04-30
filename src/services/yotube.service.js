import { youTubeApi } from "../apis/main";
import CONFIG from "../config";

const youtubeInfoSnippet = "snippet,contentDetails";
export default {
  getYouTubeApi(videoId) {
    return youTubeApi.get(
      `videos?id=${videoId}&key=${CONFIG.YOUTUBE_API_KEY}&part=${youtubeInfoSnippet}`
    );
  },
};
