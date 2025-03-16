import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useSearchItemsStore = create((set, get) => ({
  foodItems: [],
  notifications: [],
  unreadCount: 0,
  // expiringSoon: [],
  isLoading: false,
  error: null,
  isFetched: false,

  // here we will grab the token and set Authorization header
  // getAuthHeaders: () => {
  //   const token = localStorage.getItem("token");
  //   return token ? { Authorization: `Bearer ${token}` } : {};
  // },

  // Fetch food items from JSON Server
  // update: fetch food items from python backend using axios
  fetchFoodItems: async () => {
    try {
      set({ isLoading: true, error: null });

      // const authHeaders = get().getAuthHeaders();
      // if (!authHeaders.Authorization)
      //   throw new Error("User is not authenticated");
      // const response = await fetch(`${API_URL}/charity/unclaimed-food/`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     ...authHeaders,
      //   },
      // });
      // if (!response.ok) throw new Error("Failed to fetch food items");
      // const data = await response.json();

      const response = await axiosInstance.get("charity/unclaimed-food/");
      // console.log(response);
      let results = response?.data?.results || [];
      set({ foodItems: results, isLoading: false });
    } catch (error) {
      console.error("Error fetching food items:", error);
      set({ isLoading: false, error: error.message });
    }
  },

  claimFood: async (id) => {
    try {
      set({ isLoading: true, error: null });

      // console.log("Claiming Food ID:", id);
      // console.log("API URL:", `${API_URL}/charity/claim-food/${id}`);
      // const response = await fetch(`${API_URL}/charity/claim-food/${id}`, {
      //   method: "POST", // Changed to POST
      //   headers: {
      //     "Content-Type": "application/json",
      //     ...get().getAuthHeaders(),
      //   },
      //   body: JSON.stringify({ id: Number(id) }),
      // });

      // if (!response.ok) {
      //   set({ isLoading: false, error: "Failed to claim food item" });
      //   return { success: false, message: "Failed to claim food item" };
      // }
      // const data = await response.json();
      const response = await axiosInstance.post(`charity/claim-food/${id}`, {
        id: Number(id),
      });

      set((state) => ({
        foodItems: state.foodItems.map((item) =>
          item.id === id ? { ...item, claimed: true, ...response.data } : item
        ),
        isLoading: false,
      }));

      return { success: true, message: "Food Item claimed successfully" };
    } catch (error) {
      console.error("Error claiming food:", error);
      set({ isLoading: false, error: "An error occurred" });
      return { success: false, message: "An error occurred" };
    }
  },
}));

export default useSearchItemsStore;
