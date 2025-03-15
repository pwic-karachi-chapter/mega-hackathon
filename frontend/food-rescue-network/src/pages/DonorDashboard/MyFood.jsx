import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const MyFood = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch donor's submitted food items
    const fetchMyFood = async () => {
      try {
        // const response = await fetch(`${API_URL}/donor-food-listing/`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // if (!response.ok) {
        //   throw new Error("Failed to fetch food items");
        // }
        //  console.log(response.data);
        //  const data = await response.json();
        //  setFoodItems(data);
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Food Submissions</h2>
      <ul>
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <li key={item.id} className="p-3 border rounded-lg my-2 shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{item.name}</strong> - {item.quantity} {item.unit}
                </div>
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${
                    item.request_status === "pending"
                      ? "bg-yellow-500" // Yellow for pending
                      : "bg-green-600" // Green for accepted
                  }`}
                >
                  {item.request_status}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No food items submitted yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MyFood;
