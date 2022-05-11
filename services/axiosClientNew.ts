import axios from "axios";
const axiosClientNew = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_NEW_URL,
});

axiosClientNew.interceptors.request.use(
  (config: any) => {
    const customHeaders: any = {};

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

export default axiosClientNew;
