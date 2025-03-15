import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import background from "../../assets/background.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const Register = () => {
  const [organizationName, setOrganizationName] = useState("");

  // tool tip:
  const [showHint, setShowHint] = useState(false);

  // show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // show password

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const role = watch("role");

  // use navigate:
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let formData = { ...data };

    if (role === "charity") {
      formData.username = organizationName;
    }

    console.log("Final Form Data:", formData);
    // Send formData to backend
    try {
      // const response = await fetch("auth/register/", {

      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   console.error("Registration failed:", errorData);
      //   alert("Registration failed: " + (errorData.message || "Unknown error"));
      //   return;
      // }
      const response = await axiosInstance.post("auth/register/", formData);

      if (response.status !== 200) {
        const errorData = response.data;
        console.error("Registration failed:", errorData);
        alert("Registration failed: " + (errorData.message || "Unknown error"));
        return;
      }
      const result = response.data;
      console.log("Registration successful:", result);
      alert("Registration successful!");

      // Navigate to the correct dashboard with login info
      navigate("/welcome", {
        state: {
          username: result.username,
          password: formData.password,
        },
      });

      //
      //
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />

      {/* Background Container */}
      <div
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Glassmorphic Form */}
        <div className="w-full max-w-sm mx-auto bg-white/60 backdrop-blur-md shadow-lg rounded-lg px-8 pt-6 pb-6 mb-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            Please Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selector */}
            <label className="block text-gray-600 font-medium mb-2">
              Select Role:
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Role</option>
              <option value="donor">Donor</option>
              <option value="charity">Charity</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}

            {/* Username / Organization */}
            <div className="relative">
              <label className="block text-gray-600 font-medium mb-2">
                {role === "charity" ? "Organization" : "Username"}:
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                className="w-full p-2 border rounded mb-2"
                placeholder={
                  role === "charity" ? "Organization Name" : "Username"
                }
                value={
                  role === "charity"
                    ? organizationName
                    : watch("username") || ""
                }
                onChange={(e) => {
                  if (role === "charity") {
                    setOrganizationName(e.target.value);
                    setValue("username", e.target.value);
                  } else {
                    setValue("username", e.target.value);
                  }
                }}
                onFocus={() => setShowHint(true)}
                onBlur={() => setShowHint(false)}
                autoComplete="off"
              />
              {showHint && (
                <div className="absolute right-0 mt-1 w-3/4 bg-gray-900 text-gray-100 text-sm p-2 rounded shadow-md">
                  For two or more words, use hyphens. Example: justice-for-all
                </div>
              )}
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            {/* Email */}
            <label className="block text-gray-600 font-medium mb-2">
              Email:
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded mb-2"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* First Name */}
            <label className="block text-gray-600 font-medium mb-2">
              First Name:
            </label>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              className="w-full p-2 border rounded mb-2"
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}

            {/* Last Name */}
            <label className="block text-gray-600 font-medium mb-2">
              Last Name:
            </label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              className="w-full p-2 border rounded mb-2"
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}

            {/* Password */}
            <label className="block text-gray-600 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded mb-2"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <label className="block text-gray-600 font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              {...register("password2", {
                required: "Confirm password is required",
              })}
              className="w-full p-2 border rounded mb-2"
              placeholder="Confirm Password"
            />
            {errors.password2 && (
              <p className="text-red-500 text-sm">{errors.password2.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <p className="mt-2 text-center text-gray-500 text-xs">
            ©2025 Food Rescue Network. All rights reserved
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
