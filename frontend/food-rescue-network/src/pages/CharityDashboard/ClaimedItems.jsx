import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ClaimedItems = () => {
  const [claimedItems, setClaimedItems] = useState([]);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get charity username from localStorage
    const storedName = localStorage.getItem("username");
    if (storedName) {
      const formattedName = storedName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setUsername(formattedName);
    }

    const fetchClaimedItems = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   throw new Error("Authentication token is missing");
        // }

        // const response = await fetch(`${API_URL}/charity/claimed-food/`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error(`Error ${response.status}: Failed to fetch data`);
        // }

        // const data = await response.json();
        // console.log(data);
        //  setClaimedItems(data);

        const response = await axiosInstance.get("charity/claimed-food/");
        console.log(response.data);
        let results = response?.data?.results || [];
        setClaimedItems(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Claimed Food Items</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading && !error && claimedItems.length > 0 ? (
          claimedItems.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex items-center gap-4"
            >
              {/* Image Section */}
              <div className="w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">{item.foodName}</h3>
                <p className="text-gray-500">
                  <span className="font-semibold">Quantity: </span>
                  {item.quantity} <span>{item.unit}</span>
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Food Type:</span> {item.foodType}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Location:</span> {item.city}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Expires:</span> {item.expirationDate}
                </p>
              </div>
            </li>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-600 text-center col-span-2">No items were claimed</p>
          )
        )}
      </ul>
    </div>
  );
};

export default ClaimedItems;
