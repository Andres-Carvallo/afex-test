import axios from 'axios';
import CONFIG from '../config';

axios.defaults.params = {
  language_code: import.meta.env.VITE_LANGUAGE_LOCALE,
};

const youTubeApi = axios.create({ baseURL: CONFIG.YOUTUBE_BASE_URL });

export {
  youTubeApi,
};
