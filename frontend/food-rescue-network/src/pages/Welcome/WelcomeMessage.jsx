import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import background from "../../assets/background.png";

const WelcomeMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from navigation state pased by the registeration component
  const { username, password } = location.state || {};

  if (!username || !password) {
    return (
      <p className="text-center text-red-500">No account details available.</p>
    );
  }

  return (
    <>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Navbar />

        {/* Background Container */}
        <div
          className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          {/* Glassmorphic Form */}
          <div className="w-full max-w-sm mx-auto bg-white/60 backdrop-blur-md shadow-lg rounded-lg px-8 pt-6 pb-6 mb-4">
            <h2 className="text-2xl font-bold mb-4">
              Account Created Successfully!
            </h2>
            <p>
              <span className="font-semibold">Username:</span> {username}
            </p>
            <p>
              <span className="font-semibold">Password:</span> {password}
            </p>
            <p className="text-red-500 text-sm mt-2">
              Please save these details securely because you wont see this
              message again.
            </p>

            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => navigate("/login")} // Redirect to login
            >
              Go to Login
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WelcomeMessage;
