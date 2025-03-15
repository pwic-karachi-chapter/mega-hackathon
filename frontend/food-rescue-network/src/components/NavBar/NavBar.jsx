import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiInfo, FiLogIn } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import UserAuthStore from "../../stores/userAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // update navbar's avatar
  const { token, role } = UserAuthStore();

  // Close menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            <NavLink to="/">
              <img src={logo} alt="logo" className="w-35" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-3">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-primary-dark font-bold transition-colors duration-500"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-700 hover:text-primary-dark font-bold transition-colors duration-500"
            >
              About
            </NavLink>

            {/* Show user avatar if logged in, otherwise show "Login" */}
            {token ? (
              <NavLink
                to={
                  role === "charity"
                    ? "/charity-dashboard"
                    : role === "donor"
                    ? "/donor-dashboard"
                    : role === "admin"
                    ? "/admin-dashboard"
                    : "/"
                }
              >
                <img src={avatar} alt="user avatar" className="size-10" />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-primary-dark font-bold transition-colors duration-500"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-lg z-50">
          <NavLink
            to="/"
            className="flex items-center space-x-2 py-2 px-4 font-bold text-gray-700 hover:bg-gray-800 hover:text-white"
          >
            <FiHome className="size-7" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/about"
            className="flex items-center space-x-2 py-2 px-4 font-bold text-gray-700 hover:bg-gray-800 hover:text-white"
          >
            <FiInfo className="size-7" />
            <span>About</span>
          </NavLink>
          {/* Mobile menu: show avatar if logged in */}
          {token ? (
            <NavLink
              to={
                role === "charity"
                  ? "/charity-dashboard"
                  : role === "donor"
                  ? "/donor-dashboard"
                  : role === "admin"
                  ? "/admin-dashboard"
                  : "/"
              }
              className="flex items-center space-x-2 py-3 px-4 w-full border-b"
            >
              <img src={avatar} alt="user avatar" className="size-8" />
              <span className="font-bold block w-full py-2 text-gray-700 hover:bg-gray-800 hover:text-white">
                Dashboard
              </span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center space-x-2 py-2 px-4 font-bold text-gray-700 hover:bg-gray-800 hover:text-white"
            >
              <FiLogIn className="size-6" />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
