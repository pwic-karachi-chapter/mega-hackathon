import { useState, useEffect } from "react";
import useFoodStore from "../../stores/useFoodStore";
import axiosInstance from "../../utils/axiosInstance";

const FoodsTable = () => {
  const {
    foods,
    fetchFoods,
    fetchAcceptedFoods,
    fetchPendingFoods,
    fetchRejectedFoods, // Add this line
    fetchAcceptedFoodsByUsername,
    fetchNewestFoods,
    fetchOldestFoods,
    loading,
    error,
  } = useFoodStore();
  const [filters, setFilters] = useState({
    username: "",
    request_status: "",
    ordering: "",
    page: 1,
    expiration_date: "",
    created_at_gte: "",
    created_at_lte: "",
    expiration_date_gte: "",
    expiration_date_lte: "",
  });

  useEffect(() => {
    fetchFilteredFoods();
  }, [filters]);

  const fetchFilteredFoods = () => {
    if (filters.username) {
      fetchAcceptedFoodsByUsername(filters.username);
      console.log(foods);
    } else if (filters.request_status === "accepted") {
      fetchAcceptedFoods();
    } else if (filters.request_status === "pending") {
      fetchPendingFoods();
    } else if (filters.request_status === "rejected") { // Add this condition
      fetchRejectedFoods();
    } else if (filters.ordering === "created_at") {
      fetchOldestFoods();
    } else if (filters.ordering === "-created_at") {
      fetchNewestFoods();
    } else {
      fetchFoods();
    }
  };

  const handleFilterChange = (e) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [e.target.name]: e.target.value };
      // console.log("Updated filters:", newFilters); // Debugging
      return newFilters;
    });
  };
  const updateFoodStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/update-food-status/${id}`, {
        request_status: status,
      });

      // Refresh the food list after the status update
      fetchFilteredFoods();
    } catch (error) {
      console.error("Error updating food status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Foods</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          name="username"
          placeholder="Search by username"
          value={filters.username}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <select
          name="request_status"
          value={filters.request_status}
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="accepted">Accepted</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          name="ordering"
          value={filters.ordering}
          onChange={handleFilterChange}
          className="border p-2"
        >
          <option value="">Default</option>
          <option value="created_at">Oldest First</option>
          <option value="-created_at">Newest First</option>
        </select>
        {/* <input
          type="date"
          name="expiration_date"
          value={filters.expiration_date}
          onChange={handleFilterChange}
          className="border p-2"
        /> */}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Expiration</th>
                <th className="p-2 text-left">Donor</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id}>
                  <td className="p-2">{food.name}</td>
                  <td className="p-2">{food.foodType}</td>
                  <td className="p-2">
                    {food.quantity} {food.unit}
                  </td>
                  <td className="p-2">{food.expiration_date}</td>
                  <td className="p-2">{food.donor_name}</td>
                  <td className="p-2">
                    {food.request_status === "accepted" ? (
                      <span className="text-green-600 font-bold">
                        ✔️ Accepted
                      </span>
                    ) : food.request_status === "rejected" ? (
                      <span className="text-red-600 font-bold">
                        ❌ Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-bold">
                        ⏳ Pending
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    {food.request_status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateFoodStatus(food.id, "accepted")}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => updateFoodStatus(food.id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">Already processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodsTable;
