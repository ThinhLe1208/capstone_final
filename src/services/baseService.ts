import axios from 'axios';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBER, TOKEN_CYBER_HEADER } from 'utils/constants';
import storage from 'utils/storage';

export const https = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

https.interceptors.request.use(
  (config) => {
    const isLogin = storage.checkLogin();

    if (isLogin) {
      config.headers.Authorization = 'Bearer ' + storage.getStorageJson(ACCESS_TOKEN);
    }
    config.headers[TOKEN_CYBER_HEADER] = TOKEN_CYBER;
    return config;
  },
  (error) => {
    toast.error('Failed to request.');
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      toast.error("You don't have permission.", { toastId: '401/403' });
    }

    if (error.response?.status === 400 || error.response?.status === 404) {
      toast.error('The data was not found.', { toastId: '400/404' });
    }

    if (error.response?.status === 500) {
      toast.error('Internal Server Error', { toastId: '500' });
    }

    return Promise.reject(error);
  }
);
