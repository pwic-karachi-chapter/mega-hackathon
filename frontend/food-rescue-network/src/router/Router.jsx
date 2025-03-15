import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DonorDashboard from "../pages/DonorDashboard/DonorDashboard";
import CharityDashboard from "../pages/CharityDashboard/CharityDashboard";
import SearchFoods from "../pages/CharityDashboard/SearchFoods";
import ClaimedItems from "../pages/CharityDashboard/ClaimedItems";
// import Notifications from "../pages/CharityDashboard/Notifications";
// import ArchivedNotifications from "../pages/CharityDashboard/ArchivedNotifications";
import FoodList from "../pages/DonorDashboard/FoodList";
import ClaimedItemsDonor from "../pages/DonorDashboard/ClaimedItemsDonor";
// import NotificationsDonor from "../pages/DonorDashboard/NotificationsDonor";
import WelcomeMessage from "../pages/Welcome/WelcomeMessage";
// import ArchivedNotifDonor from "../pages/DonorDashboard/ArchivedNotifDonor";
import MyFood from "../pages/DonorDashboard/MyFood";
import AdminDashboard from "../pages/Admin/AdminDashbard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import OurDonors from "../pages/Donors/OurDonors";
import OurCharities from "../pages/OurCharities/OurCharities";
import GuidelinesPage from "../pages/Guidelines/Guidelines";
import About from "../pages/About/About";
import FoodsTable from "../pages/Admin/FoodsTable";
import DonationsTable from "../pages/Admin/DonationsTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },

  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },

  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/welcome",
    element: (
      <div>
        <WelcomeMessage />
      </div>
    ),
  },

  {
    path: "/admin-dashboard",
    element: (
      <div>
        <AdminDashboard />
      </div>
    ),
  },
  {
    path: "/our-donors",
    element: (
      <div>
        <OurDonors />
      </div>
    ),
  },
  {
    path: "/our-charities",
    element: (
      <div>
        <OurCharities />
      </div>
    ),
  },

  {
    path: "/guidelines",
    element: (
      <div>
        <GuidelinesPage />
      </div>
    ),
  },
  {
    path: "/about",
    element: (
      <div>
        <About />
      </div>
    ),
  },

  {
    element: <ProtectedRoute />, // This will check for a valid token
    children: [
      {
        path: "/donor-dashboard",
        element: <DonorDashboard />,
        children: [
          { path: "", element: <FoodList /> },
          { path: "food-list", element: <FoodList /> },
          { path: "claimed-items-donor", element: <ClaimedItemsDonor /> },
          // { path: "donor-notifications", element: <NotificationsDonor /> },
          // { path: "archived-donor-notif", element: <ArchivedNotifDonor /> },
          { path: "my-food", element: <MyFood /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />, // This will check for a valid token
    children: [
      {
        path: "/charity-dashboard",
        element: <CharityDashboard />,
        children: [
          { path: "", element: <SearchFoods /> },
          { path: "search-foods", element: <SearchFoods /> },
          { path: "claimed-items", element: <ClaimedItems /> },
          // { path: "notifications", element: <Notifications /> },
          // {
          //   path: "archived-notifications",
          //   element: <ArchivedNotifications />,
          // },
        ],
      },
    ],
  },
]);

export default router;
