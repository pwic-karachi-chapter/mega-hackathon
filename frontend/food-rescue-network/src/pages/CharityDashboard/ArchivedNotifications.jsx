import { useEffect, useState } from "react";
import useNotificationsStore from "../../stores/notificationStore";

const ArchivedNotifications = () => {
  const {
    removeArchivedPermanently,
    notifications,
    fetchNotifications,
    isLoading,
  } = useNotificationsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []); // Depend on isFetched to avoid redundant calls

  const readNotifications = notifications.filter((n) => n.read);

  const openModal = (id) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = () => {
    if (selectedId) {
      const id = selectedId;
      removeArchivedPermanently(id);
      closeModal();
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Archived Notifications
        </h2>

        {readNotifications.length === 0 ? (
          <p className="text-gray-500 text-center">No archived notifications</p>
        ) : (
          <ul className="space-y-4">
            {readNotifications.map((notif) => (
              <li
                key={notif.id}
                className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center shadow-sm flex-wrap gap-2"
              >
                <span className="text-gray-700 flex-1">{notif.message}</span>
                <button
                  onClick={() => openModal(notif.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded-lg transition text-sm"
                >
                  Remove Permanently
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h3>
            <p className="text-gray-600 mt-2">
              Do you really want to remove this notification permanently?
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ArchivedNotifications;
