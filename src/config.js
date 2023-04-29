const CONFIG = {};

CONFIG.ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
CONFIG.YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/";
CONFIG.YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_KEY;
export default CONFIG;
