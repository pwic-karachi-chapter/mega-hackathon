import {
  FaBoxOpen,
  FaHandHoldingHeart,
  FaShippingFast,
  FaExclamationTriangle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";
import { useEffect } from "react";

const GuidelinesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar /> {/* Fixed Navbar remains at the top */}
      <main className="min-h-screen bg-gray-100 pt-24 py-12 px-6 md:px-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-dark to-primary bg-clip-text text-transparent">
            Food Donation Guidelines
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Follow these safety protocols to ensure proper food handling and
            responsible giving.
          </p>
        </div>

        {/* Guidelines Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Acceptable Donations */}
          <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300">
            <FaBoxOpen className="text-4xl text-accent" />
            <h3 className="text-2xl font-bold mt-4">Acceptable Donations</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Fresh produce, canned goods, grains</li>
              <li>Baked goods in sealed packaging</li>
              <li>Properly stored dairy products</li>
            </ul>
          </div>

          {/* Unacceptable Donations */}
          <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300">
            <FaExclamationTriangle className="text-4xl text-red-500" />
            <h3 className="text-2xl font-bold mt-4">Unacceptable Donations</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Expired or moldy food</li>
              <li>Opened or partially used items</li>
              <li>expired raw meat, seafood, or alcohol</li>
            </ul>
          </div>

          {/* Food Handling & Storage */}
          <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300">
            <FaHandHoldingHeart className="text-4xl text-primary" />
            <h3 className="text-2xl font-bold mt-4">Food Handling & Storage</h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Store perishables at correct temperatures</li>
              <li>Label food with prep & expiration dates</li>
              <li>Use clean, sealed containers</li>
            </ul>
          </div>

          {/* Transportation */}
          <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-300">
            <FaShippingFast className="text-4xl text-blue-500" />
            <h3 className="text-2xl font-bold mt-4">
              Transportation Guidelines
            </h3>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Use insulated bags for perishable items</li>
              <li>Deliver food promptly</li>
              <li>Transport in clean, sanitized containers</li>
            </ul>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <NavLink
            to="/register"
            className="px-6 py-3 rounded-md font-bold bg-gradient-to-r from-accent-dark to-accent text-white transition duration-300 hover:from-accent-light hover:to-accent"
          >
            Register Here
          </NavLink>
        </div>
      </main>
      <Footer /> {/* Footer at the bottom */}
    </>
  );
};

export default GuidelinesPage;
