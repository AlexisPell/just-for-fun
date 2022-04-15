import axios from 'axios';
import { environment } from '../constants/env';

export const axiosSetup = () => {
  axios.defaults.baseURL = `${environment.BACKEND_ENDPOINT}`;

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  axios.defaults.withCredentials = true;
};
