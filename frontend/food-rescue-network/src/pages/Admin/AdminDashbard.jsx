import { useNavigate } from "react-router-dom";
import useFoodStore from "../../stores/useFoodStore";
import { useEffect } from "react";
import FoodsTable from "./FoodsTable";
import DonationsTable from "./DonationsTable";
import UserAuthStore from "../../stores/userAuthStore";

const Navbar = () => {
  const setSection = useFoodStore((state) => state.setSection);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-bold">Admin Dashboard</h2>
      <div className="space-x-4">
        <button onClick={() => setSection("foods")} className="text-sm">
          Foods
        </button>
        <button onClick={() => setSection("donations")} className="text-sm">
          Donations
        </button>
        <button
          onClick={() => setSection("logout")}
          className="text-sm text-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const { section } = useFoodStore();
  const navigate = useNavigate();
  const { logout } = UserAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 p-4">
        {section === "foods" && <FoodsTable />}
        {section === "donations" && <DonationsTable />}
        {section === "logout" && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Logout</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Confirm Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
