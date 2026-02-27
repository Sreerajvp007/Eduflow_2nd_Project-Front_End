
import axios from "axios";
import store from "../app/store";

const axiosInstance = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();

  const token =
    state.admin?.accessToken ||
    state.tutorAuth?.accessToken ||
    state.parentAuth?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
