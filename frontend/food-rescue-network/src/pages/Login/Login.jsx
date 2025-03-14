import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import background from "../../assets/background.png"; // Ensure this path is correct

// import zustand store
import UserAuthStore from "../../stores/userAuthStore";

const Login = () => {
  const { login } = UserAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await login(data.username, data.password);

      if (result && result.token && result.role) {
        if (result.role === "admin") {
          navigate("/admin-dashboard");
        } else if (result.role === "charity") {
          navigate("/charity-dashboard");
        } else {
          navigate("/donor-dashboard");
        }
      } else {
        console.log("Invalid login credentials.");
        // setMessage("Invalid login credentials.");
      }
      reset();
    } catch (error) {
      console.log("Login failed. Please check your details.");
      // setMessage("Login failed. Please check your details.");
    }
  };

  return (
    <div
      className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      {/* Login Form with Glassmorphism */}
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4 text-black text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="username"
                placeholder="your username"
                className="appearance-none shadow border rounded w-full py-2 px-3 bg-white/60 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                className="appearance-none shadow border rounded w-full py-2 px-3 bg-white/60 focus:outline-none"
              />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-6 rounded w-full">
              Login
            </button>
          </form>

          <p className="text-center font-medium mt-4 text-sm text-black">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-300 underline">
              Register here
            </NavLink>
          </p>

          <p className="mt-2 text-center text-black text-xs">
            ©2025 Food Rescue Network. All rights reserved
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
