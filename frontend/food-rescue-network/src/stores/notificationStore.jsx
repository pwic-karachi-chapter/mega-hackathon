// import { IoMailUnread } from "react-icons/io5";
// import { create } from "zustand";

// const API_URL = "http://localhost:5001";

// const useNotificationsStore = create((set, get) => ({
//   // these are unread notifications
//   notifications: [],

//   unreadCount: 0,
//   isLoading: false,
//   error: null,
//   isFetched: false,

//   // here we will grab the token and set Authorization header
//   getAuthHeaders: () => {
//     const token = localStorage.getItem("token");
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   },

//   fetchNotifications: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await fetch(`${API_URL}/notifications`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch notifications");
//       }

//       const data = await response.json();
//       const unread = data.filter((item) => {
//         return item.read === false;
//       });
//       set({
//         notifications: data,
//         unreadCount: unread.length,
//         isLoading: false,
//         error: null,
//         isFetched: true,
//       });
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       set({ isLoading: false, error: error.message });
//     }
//   },
//   markAsRead: async () => {
//     const unreadNotifications = get().notifications.filter(
//       (notification) => !notification.read
//     );

//     if (unreadNotifications.length === 0) {
//       console.log("No unread notifications to update.");
//       return;
//     }

//     const updatedPromises = unreadNotifications.map(async (notif) => {
//       try {
//         const response = await fetch(`${API_URL}/notifications/${notif.id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ read: true }),
//         });

//         if (!response.ok) {
//           console.log(
//             `Failed to update notification ${notif.id}`,
//             response.status
//           );
//         }
//       } catch (error) {
//         console.log("Error updating ID: ", error);
//       }
//     });

//     await Promise.all(updatedPromises);

//     // Update notifications list properly

//     set((state) => {
//       const updatedNotifications = state.notifications.map((notif) => ({
//         ...notif,
//         read: true,
//       }));

//       return {
//         notifications: updatedNotifications,
//         unreadCount: 0,
//       };
//     });
//   },

//   // remove the notifications from the archived folder, so remove permanently
//   // this is to mark read a single notification, not using it yet
//   removeArchivedPermanently: async (id) => {
//     try {
//       set({ isLoading: true, error: null });
//       const response = await fetch(`${API_URL}/notifications/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           ...get().getAuthHeaders(),
//         },
//       });

//       if (!response.ok) {
//         set({ isLoading: false, error: "Error deleting notification" });
//         console.log("could not delete the notification");
//       }
//       const data = response.json();
//       console.log(data);
//     } catch (error) {
//       console.log(`Error in deleting notification: ${error}`);
//     }
//     set((state) => ({
//       archivedNotifications: state.notifications.filter((n) => n.id !== id),
//       isLoading: false,
//     }));
//   },

//   // no patch request made to backend here:
//   toggleNotification: (id) => {
//     set((state) => {
//       const updatedNotifications = state.notifications.map((notif) =>
//         notif.id === id ? { ...notif, read: !notif.read } : notif
//       );
//       return {
//         notifications: updatedNotifications,
//         unreadCount: updatedNotifications.filter((n) => !n.read).length,
//       };
//     });
//   },
// }));

// export default useNotificationsStore;
