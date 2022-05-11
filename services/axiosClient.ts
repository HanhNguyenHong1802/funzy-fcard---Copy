import axios from "axios";
import { parseCookies } from "nookies";

import { ACCESS_TOKEN } from "constants/authentication";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    const customHeaders: any = {};
    const cookies = parseCookies();
    const accessToken = cookies[ACCESS_TOKEN];
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // but you can override for some requests
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
