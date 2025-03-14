import { useState, useEffect } from "react";
import useSearchItemsStore from "../../stores/searchItemsStore";
import { getDistance } from "geolib";

const SearchFood = () => {
  const { foodItems, fetchFoodItems, claimFood } = useSearchItemsStore();
  const [filters, setFilters] = useState({
    foodType: "",
    expirationDate: "",
  });
  const [charityLocation, setCharityLocation] = useState({
    lat: null,
    lon: null,
  });

  // charity name:
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  let filteredFood = foodItems ? [...foodItems] : [];
  console.log(filteredFood);

  if (filters.foodType) {
    filteredFood = filteredFood.filter(
      (item) => item.foodType === filters.foodType
    );
  }

  if (filters.expirationDate) {
    filteredFood = filteredFood.filter(
      (item) =>
        new Date(item.expirationDate) >= new Date(filters.expirationDate)
    );
  }

  // getting the coordinates:
  const getCharityLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCharityLocation({
          lat: latitude,
          lon: longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getCharityLocation();
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      const formattedName = storedName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setUsername(formattedName); // Set the correctly formatted name
    }
  }, []);

  // find out which donors are the closest with geolib and also changed the filteredFood aray:
  if (charityLocation.lat !== null && charityLocation.lon !== null) {
    filteredFood = filteredFood
      .map((item) => {
        const getTheDistance = getDistance(
          { latitude: charityLocation.lat, longitude: charityLocation.lon },
          { latitude: item.latitude, longitude: item.longitude }
        );

        const distanceInKilometers = (getTheDistance / 1000).toFixed(0);

        return { ...item, distance: distanceInKilometers };
      })
      .sort((a, b) => a.distance - b.distance);
  }

  // rendering image through proxy
  // const API_URL = import.meta.env.VITE_API_URL;
  // const proxyImage = `${API_URL}/media/food_images/WhatsApp_Image_2025-02-08_at_8.34.10_PM.jpeg`;
  // console.log(proxyImage);
  // image is rendered through the proxy

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          name="foodType"
          onChange={handleChange}
          value={filters.foodType}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Food Types</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
          <option value="bakery">Bakery</option>
          <option value="meal">Meals</option>
          <option value="snacks">Snacks</option>
        </select>

        <input
          type="date"
          name="expirationDate"
          onChange={handleChange}
          value={filters.expirationDate}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
          focus:ring-blue-500"
        />
      </div>

      {/* charity location will be displayed on component mount */}
      <div className="mb-6 bg-primary-dark p-4 rounded-lg shadow-md flex items-center justify-between">
        {charityLocation ? (
          <div>
            <h3 className="text-black font-semibold text-lg">
              Charity Location
            </h3>
            <p className="text-gray-700 mt-1">
              📍 <span className="font-medium">Latitude:</span>{" "}
              {charityLocation.lat}
            </p>
            <p className="text-gray-700">
              📍 <span className="font-medium">Longitude:</span>{" "}
              {charityLocation.lon}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Fetching location...</p>
        )}
      </div>
      {/* charity locatoin */}

      {/* Food List */}
      <h2 className="text-2xl font-bold text-black text-center mb-4">
        Donors Closest to You
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFood.map((item) => (
          <li
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            {/* image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            {/* image */}

            <h3 className="text-lg font-semibold">{item.donor}</h3>
            <p className="text-primary-dark drop-shadow-sm">
              <span className="font-semibold">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </span>
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Quantity: </span>
              {item.quantity}
              <span> {item.unit} </span>
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Food Type: </span> {item.foodType}
            </p>

            <p className="text-gray-500">
              <span className="font-semibold">Expires: </span>
              {item.expiration_date}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Distance:</span> {item.distance}
              <span> </span>
              Kilometers
            </p>
            {!item.claimed && (
              <button
                onClick={() => claimFood(item.id)}
                className="mt-4 py-2 w-full rounded-md font-bold bg-linear-to-t from-accent-dark to-accent text-black transition duration-300 hover:from-accent-light hover:to-accent"
              >
                Claim
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFood;
