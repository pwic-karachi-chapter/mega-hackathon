import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance"; // Import your axios instance

const useFoodStore = create((set) => ({
  foods: [],
  filters: {
    ordering: "",
  },
  section: "foods",
  loading: false,
  error: null,

  setSection: (newSection) => set({ section: newSection }),

  // 🔹 Fetch all food items
  fetchFoods: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("foods/");
      set({ foods: response.data.results, loading: false });
    } catch (error) {
      console.error("Error fetching foods:", error);
      set({ error: "Failed to fetch foods", loading: false });
    }
  },

  // 🔹 Fetch accepted food requests
  fetchAcceptedFoods: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        "/foods/?request_status=accepted"
      );
      set({ foods: response.data.results, loading: false });
    } catch (error) {
      console.error("Error fetching accepted foods:", error);
      set({ error: "Failed to fetch accepted foods", loading: false });
    }
  },

  // 🔹 Fetch pending food requests
  fetchPendingFoods: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(
        "/foods/?request_status=pending"
      );
      console.log(response);
      set({ foods: response.data.results, loading: false });
    } catch (error) {
      console.error("Error fetching pending foods:", error);
      set({ error: "Failed to fetch pending foods", loading: false });
    }
  },
  // 🔹 Fetch Accepted Foods By Username
  fetchAcceptedFoodsByUsername: async (username) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/foods/?request_status=accepted&username=${username}`
      );

      set({ foods: response.data.results || [], loading: false });
    } catch (error) {
      set({ error: "Failed to fetch accepted foods", loading: false });
      console.error("Error fetching accepted foods:", error);
    }
  },

  // 🔹 Fetch newest Foods (most recent)

  fetchNewestFoods: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get("/foods/?ordering=-created_at");
      set({
        foods: response.data.results,
        filters: { ordering: "-created_at" },
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch newest foods", loading: false });
      console.error("Error fetching newest foods:", error);
    }
  },

  // 🔹 Fetch Oldest Foods (first created)
  fetchOldestFoods: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get("/foods/?ordering=created_at");
      set({
        foods: response.data.results,
        filters: { ordering: "created_at" },
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch oldest foods", loading: false });
      console.error("Error fetching oldest foods:", error);
    }
  },
}));

export default useFoodStore;
