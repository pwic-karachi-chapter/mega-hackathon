import { NavLink, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import {
  IoSearch,
  IoNotificationsOutline,
  IoArchiveOutline,
} from "react-icons/io5";
import { FaBoxOpen, FaListAlt, FaUtensils } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

import useUserAuthStore from "../../stores/userAuthStore";
// for notification badge import the store
// import useNotificationsStore from "../../stores/notificationStore";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useUserAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // try to get the donor name:
  const [username, setUsername] = useState(null);

  // get notifications from notification store
  // const { unreadCount, fetchNotifications } = useNotificationsStore();

  // get the fetch

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // notification badge was not showing when the dashboard mounted so
  // we need to call fetch notifications here too:

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

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

  return (
    <>
      <div>
        <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
          {/* Sidebar for medium and larger screens */}
          <aside className="hidden md:flex md:flex-col bg-gray-800 text-gray-500">
            <NavLink
              to="/"
              className="inline-flex items-center justify-center h-20 w-20 bg-primary hover:bg-primary-dark"
              title="Home"
            >
              <IoHomeOutline className="size-8 text-black" />
            </NavLink>
            <div className="flex-grow flex flex-col justify-between">
              <nav className="flex flex-col mx-4 my-6 space-y-4">
                <NavLink
                  to="/donor-dashboard/food-list"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg"
                  title="Food List"
                >
                  <FaListAlt className="size-6 mr-2" />
                </NavLink>
                <NavLink
                  to="/donor-dashboard/my-food"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg"
                  title="My Food Submissions"
                >
                  <FaUtensils className="size-6 mr-2" />
                </NavLink>
                <NavLink
                  to="/donor-dashboard/claimed-items-donor"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg"
                  title="Claimed Items By Charities"
                >
                  <FaBoxOpen className="size-6 mr-2" />
                </NavLink>

                {/* notifications */}
                {/* <NavLink
                  to="/donor-dashboard/donor-notifications"
                  className="relative inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg"
                  title="Notifications"
                >
                  <IoNotificationsOutline className="size-6 mr-2" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </NavLink> */}

                {/* archived */}
                {/* <NavLink
                  to="/donor-dashboard/archived-donor-notif"
                  className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg"
                  title="Archived Notifications"
                >
                  <IoArchiveOutline className="size-6 mr-2" />
                </NavLink> */}
              </nav>
            </div>
          </aside>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="md:hidden absolute top-16 right-20 bg-white shadow-lg rounded-lg py-4 px-6 z-50"
            >
              <NavLink
                to="/"
                className="flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <IoHomeOutline className="size-5 mr-2" /> Home
              </NavLink>
              <NavLink
                to="/donor-dashboard/food-list"
                className="flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <FaListAlt className="size-5 mr-2" /> Food List
              </NavLink>
              <NavLink
                to="/donor-dashboard/my-food"
                className="flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <FaUtensils className="size-5 mr-2" /> My Food
              </NavLink>
              <NavLink
                to="/donor-dashboard/claimed-items-donor"
                className="flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <FaBoxOpen className="size-5 mr-2" /> Claimed Items
              </NavLink>
              {/* notification */}
              {/* <NavLink
                to="/donor-dashboard/donor-notifications"
                className="relative flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <IoNotificationsOutline className="size-5 mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <div className="absolute bottom-5 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
                )}
              </NavLink> */}

              {/* archived */}
              {/* <NavLink
                to="/donor-dashboard/archived-donor-notif"
                className="flex items-center py-2 hover:bg-gray-400 hover:text-primary"
              >
                <IoArchiveOutline className="size-5 mr-2" /> Archived
              </NavLink> */}
            </div>
          )}

          <div className="flex-grow text-gray-800">
            <header className="flex items-center justify-between h-20 px-6 bg-primary-dark">
              <h1 className="text-xl font-semibold">Hello, {username}!</h1>
              <div className="flex items-center space-x-4">
                {/* Hamburger Menu */}
                <button
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-400 hover:text-primary rounded-full"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <FiX className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
                  )}
                </button>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-800 hover:bg-gray-400 hover:text-primary rounded-full"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </header>

            {/* Main content under title */}
            <main className="p-6 sm:p-10 space-y-6">
              <Outlet />
            </main>
          </div>
        </section>
      </div>
    </>
  );
};
export default DonorDashboard;
