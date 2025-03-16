import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ClaimedItemsDonor = () => {
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

  const formatSentenceCase = (text) => {
    return text
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
      .join(" "); // Join back
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Claimed Food Items</h2>
      {foodItems.length === 0 ? (
        <p>No claimed food items.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems
            .filter((item) => item.claimed)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm"><strong>Food Type:</strong> {item.foodType}</p>
                <p className="text-sm">
                  <strong>Quantity:</strong> {item.quantity} {item.unit}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  <strong className="text-[#93af34]">Claimed By:</strong>{" "}
                  <span className="bg-[#c4fd07] text-gray-900 font-semibold text-center rounded-md py-1 px-3 inline-block shadow">
                    {formatSentenceCase(item.claimedBy)}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {item.city}, {item.country}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default ClaimedItemsDonor;
