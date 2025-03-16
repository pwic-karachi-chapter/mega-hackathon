import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import UserAuthStore from "../stores/userAuthStore";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

// 🔹 Create a separate instance to prevent looping issues
const refreshInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("Interceptor ran");

    let accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) return config;

    const decodedToken = jwtDecode(accessToken);
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    if (!refreshToken) {
      console.error("No refresh token available. Logging out.");
      //   zustand store
      UserAuthStore.getState().logout();
      return Promise.reject(new Error("Session expired. Please log in again."));
    }

    // 🔹 Use refreshInstance to avoid infinite loops
    try {
      console.log("Refreshing token...");
      const response = await refreshInstance.post(
        `auth/refresh-token/`,
        { refresh: refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccessToken = response.data.access;

      // Save the new token
      UserAuthStore.getState().updateToken(newAccessToken);

      // Attach new token to the request
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error("Refresh token failed:", error);
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("refreshToken");
      //   zustand's logout already removes from local storage
      UserAuthStore.getState().logout();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
