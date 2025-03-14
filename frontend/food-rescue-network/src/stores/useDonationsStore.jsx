import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useDonationStore = create((set) => ({
  donations: [],
  loading: false,
  error: null,

  // 🔹 Fetch donations
  fetchDonations: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("donations/");
      set({ donations: response.data.results, loading: false });
    } catch (error) {
      console.error("Error fetching donations:", error);
      set({ error: "Failed to fetch donations", loading: false });
    }
  },

  // 🔹 Fetch all claimed donations
  fetchClaimedDonations: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get("/donations/?is_claimed=True");
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch claimed donations", loading: false });
      console.error("Error fetching claimed donations:", error);
    }
  },

  //🔹 Fetch donations before a specific date
  fetchDonationsBeforeDate: async (date) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/donations?claimed_at__lt=${date}`
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch donations before date", loading: false });
      console.error("Error fetching donations before date:", error);
    }
  },

  // 🔹 Fetch newest donations
  fetchNewestDonations: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        "/donations/?ordering=-claimed_at"
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch newest donations", loading: false });
      console.error("Error fetching newest donations:", error);
    }
  },

  // 🔹 Fetch oldest donations
  fetchOldestDonations: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        "/donations/?ordering=claimed_at"
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch oldest donations", loading: false });
      console.error("Error fetching oldest donations:", error);
    }
  },

  // 🔹 Fetch donations by charity
  fetchDonationsByCharity: async (charityUsername) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/donations/?charity_username=${charityUsername}`
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch donations by charity", loading: false });
      console.error("Error fetching donations by charity:", error);
    }
  },

  // 🔹 Fetch donations by donor
  fetchDonationsByDonor: async (donorUsername) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/donations/?donor_username=${donorUsername}`
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch donations by donor", loading: false });
      console.error("Error fetching donations by donor:", error);
    }
  },

  // 🔹 Fetch donations by food type
  fetchDonationsByFoodType: async (foodType) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/donations/?food_type=${foodType}`
      );
      set({
        donations: response.data.results,
        loading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch donations by food type", loading: false });
      console.error("Error fetching donations by food type:", error);
    }
  },
}));

export default useDonationStore;
