// import useNotificationsStore from "../../stores/notificationStore";
// import { useEffect } from "react";

// const NotificationsDonor = () => {
//   const { notifications, unreadCount, markAsRead, fetchNotifications } =
//     useNotificationsStore();

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const unreadNotifications = notifications.filter((n) => !n.read);
//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Notifications</h2>
//         {unreadCount > 0 && (
//           <button
//             onClick={markAsRead}
//             className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//           >
//             Mark all as read
//           </button>
//         )}
//       </div>
//       {/* Unread Count Badge */}
//       {unreadCount > 0 && (
//         <div className="mb-3 text-red-500 font-medium">
//           You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
//           .
//         </div>
//       )}
//       {/* display notifications based on their read field */}
//       <ul className="space-y-2 border-t pt-3">
//         {unreadNotifications.length > 0 ? (
//           unreadNotifications.map((notif) => (
//             <li key={notif.id}>{notif.message}</li>
//           ))
//         ) : (
//           <p className="text-gray-500">No new notifications</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default NotificationsDonor;
