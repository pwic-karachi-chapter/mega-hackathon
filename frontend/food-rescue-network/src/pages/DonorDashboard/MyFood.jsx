import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const MyFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch donor's submitted food items
    const fetchMyFood = async () => {
      try {
        const response = await axiosInstance.get("donor-food-listing/");
        console.log(response);
        let results = response?.data?.results || [];
        setFoodItems(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyFood();
  }, []);

  const handleRowClick = (foodItem) => {
    setSelectedFood(foodItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Food Submissions</h2>
      <ul>
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <li
              key={item.id}
              className="p-3 border rounded-lg my-2 shadow-md cursor-pointer"
              onClick={() => handleRowClick(item)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong>{item.name}</strong> - {item.quantity} {item.unit}
                </div>
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${
                    item.request_status === "pending"
                      ? "bg-yellow-500" // Yellow for pending
                      : item.request_status === "rejected"
                      ? "bg-red-500" // Red for rejected
                      : "bg-green-600" // Green for accepted
                  }`}
                >
                  {item.request_status.charAt(0).toUpperCase() + item.request_status.slice(1)}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No food items submitted yet.</p>
        )}
      </ul>

      {isModalOpen && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg text-center font-semibold mb-4">{selectedFood.name}</h3>
            {selectedFood.image && (
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <p><strong>Quantity:</strong> {selectedFood.quantity} {selectedFood.unit}</p>
            <p><strong>Food Type:</strong> {selectedFood.foodType}</p>
            <p><strong>Location:</strong> {selectedFood.city}, {selectedFood.country}</p>
            <p><strong>Latitude:</strong> {selectedFood.latitude}</p>
            <p><strong>Longitude:</strong> {selectedFood.longitude}</p>
            <p><strong>Expires:</strong> {selectedFood.expiration_date}</p>
            <p><strong>Status:</strong> {selectedFood.request_status.charAt(0).toUpperCase() + selectedFood.request_status.slice(1)}</p>
            <p><strong>Claimed:</strong> {selectedFood.claimed ? "Yes" : "No"}</p>
            <p><strong>Claimed By:</strong> {selectedFood.claimedBy || "N/A"}</p>
            <p><strong>Claimed At:</strong> {selectedFood.claimedAt || "N/A"}</p>
            <button
              onClick={closeModal}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFood;
