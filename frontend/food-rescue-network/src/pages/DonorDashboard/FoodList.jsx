import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import background from "../../assets/background.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const FoodList = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [loadingLocation, setLoadingLocation] = useState(false);

  // save the image in state:
  const [preview, setPreview] = useState(null); // To show image preview

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // this is how we are setting the privew
      setPreview(URL.createObjectURL(file));
      // manually we need to set the file in the image
      setValue("image", [file]);
    }
  };

  // set  username
  const [username, setUsername] = useState(null);

  // we will find latitude and longitude
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setValue("latitude", latitude);
        setValue("longitude", longitude);

        // Use reverse geocoding to get city & country
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        if (data && data.address) {
          setValue("city", data.address.city || "Unknown");
          setValue("country", data.address.country || "Unknown");
        } else {
          alert("Could not retrieve location details. Try again.");
        }
        setLoadingLocation(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      }
    );
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    try {
      // const response = await fetch("http://localhost:5000/api/add-food/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     donor: data.donor,
      //     name: data.foodName,
      //     foodType: data.foodType,
      //     quantity: data.quantity,
      //     unit: data.unit,
      //     city: data.city,
      //     country: data.country,
      //     // latitude: parseFloat(data.latitude) || 0,
      //     // longitude: parseFloat(data.longitude) || 0,
      //     latitude: data.latitude,
      //     longitude: data.longitude,
      //     expiration_date: data.expirationDate,
      //     claimed: false,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(`Failed to add food item. Status: ${response.status}`);
      // }
      // const result = await response.json();
      // console.log("Food Item Added:", result);

      const formData = new FormData();
      formData.append("donor", data.donor);
      formData.append("name", data.foodName);
      formData.append("foodType", data.foodType);
      formData.append("quantity", data.quantity);
      formData.append("unit", data.unit);
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      formData.append("expiration_date", data.expirationDate);
      formData.append("claimed", false);

      // Append the image if it exists
      // [0] means to only send the first file
      if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        // Debug
        //
        console.log("Image File Selected:", data.image[0]);
        //
        formData.append("image", imageFile);
      } else {
        console.warn("No image selected.");
      }
      const response = await axiosInstance.post("add-food/", formData);

      console.log("Food Item Added:", response.data);
      toast.success("Food item successfully added!");
      reset();
      setPreview(null);
      //
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Error adding food item: ${error.message}`);
    }
  };

  // grab username:
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      const formattedName = storedName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setUsername(formattedName);
      // we will use set value to set the "donor" field default value:
      setValue("donor", formattedName);
    }
  }, [setValue]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 border border-white/30 rounded-lg shadow-lg backdrop-blur-md bg-white/10"
      >
        {/* Donor Name */}
        <label className="block mb-2 text-black">
          Donor Name:
          <input
            {...register("donor")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            required
          />
        </label>

        {/* Food Name */}
        <label className="block mb-2 text-black">
          Food Name:
          <input
            {...register("foodName")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            required
          />
        </label>

        {/* Food Type */}
        <label className="block mb-2 text-black">
          Food Type:
          <select
            {...register("foodType")}
            className="w-full border p-2 rounded text-black bg-white/70"
          >
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="bakery">Bakery</option>
            <option value="meal">Meals</option>
            <option value="snack">Snacks</option>
            <option value="liquid">Liquid</option>
          </select>
        </label>

        {/* Quantity */}
        <label className="block mb-2 text-black">
          Quantity:
          <input
            {...register("quantity")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            placeholder="Enter a number (10, 30, 2)"
            required
          />
        </label>

        {/* Unit */}
        <label className="block mb-2 text-black">
          Unit:
          <input
            {...register("unit")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            placeholder="Enter unit (kg, box, liters, etc.)"
            required
          />
        </label>

        {/* Location */}
        <label className="block mb-2 text-black">
          City:
          <input
            {...register("city")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            required
          />
        </label>

        <label className="block mb-2 text-black">
          Country:
          <input
            {...register("country")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            required
          />
        </label>

        <label className="block mb-2 text-black">
          Latitude:
          <input
            {...register("latitude")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            readOnly
          />
        </label>

        <label className="block mb-2 text-black">
          Longitude:
          <input
            {...register("longitude")}
            type="text"
            className="w-full border p-2 rounded text-black bg-white/70"
            readOnly
          />
        </label>

        {/* Use Current Location Button */}
        <button
          type="button"
          onClick={getCurrentLocation}
          className="bg-blue-600 text-white font-semibold px-5 py-2 mb-2 rounded-full shadow-lg transition-transform transform hover:bg-blue-700 w-full mt-3"
          disabled={loadingLocation}
        >
          {loadingLocation ? "Fetching location..." : "📍 Use Current Location"}
        </button>

        {/* Expiration Date */}
        <label className="block mb-2 text-black">
          Expiration Date:
          <input
            {...register("expirationDate")}
            type="date"
            className="w-full border p-2 rounded text-black bg-white/70 mb-2"
            required
          />
        </label>

        {/* Claimed (Hidden Field) */}
        <input {...register("claimed")} type="hidden" value="false" />

        {/* image */}
        <input
          type="file"
          id="fileInput"
          {...register("image")}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <span>Upload Image: </span>
        <label
          htmlFor="fileInput"
          className="bg-blue-600 text-white font-semibold px-5 py-2 mb-2 rounded-full shadow-lg transition-transform transform hover:bg-blue-700 mt-4"
        >
          Upload
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="image-preview mt-5" />
        )}
        {/* image */}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-1 mt-5 rounded-2xl shadow-md transition duration-300 hover:bg-gray-700 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default FoodList;
