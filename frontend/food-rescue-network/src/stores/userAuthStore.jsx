import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const UserAuthStore = create((set) => ({
  username: localStorage.getItem("username") || null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  loading: false,
  error: null,

  updateToken: (newToken) => {
    set({ token: newToken });
    localStorage.setItem("token", newToken);
  },

  login: async (username, password) => {
    set({ loading: true, error: null });

    // const requestBody = JSON.stringify({ username, password });
    // for axios send req body with stringify
    const requestBody = { username, password };
    console.log("Login Request Body:", requestBody);

    try {
      // const response = await fetch("http://localhost:5000/api/auth/login/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: requestBody,
      // });

      // if (!response.ok) {
      //   throw new Error("Login failed");
      // }
      // const data = await response.json();
      // console.log("Backend Response:", data);

      // ✅ Adding axios here:

      const response = await axiosInstance.post("auth/login/", requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      console.log("Backend Response:", data);
      // ✅ Added axios above:

      set({
        username: data.username,
        token: data.access,
        refreshToken: data.refresh,
        role: data.role,
        name: `${data.first_name} ${data.last_name}`,
        loading: false,
      });

      // Store in localStorage
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", `${data.first_name} ${data.last_name}`);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);

      console.log("User logged in:", data);

      // returning the token and role for Login component
      return { token: data.access, role: data.role };
      //
    } catch (error) {
      console.error("Error:", error);
      set({ loading: false, error: error.message });
    }
  },
  // ✅ Find old logout in google sheet about token expiry:
  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await axiosInstance.post("auth/logout/", {
          refresh: refreshToken,
        });
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    // Reset state
    set({
      username: null,
      token: null,
      refreshToken: null,
      role: null,
      name: null,
    });

    console.log("User logged out.");
  },
}));

export default UserAuthStore;
