const CONFIG = {};

/* Set api host from environment. Set in .env. */
// eslint-disable-next-line no-nested-ternary
CONFIG.ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
CONFIG.YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/videos?'
export default CONFIG;
