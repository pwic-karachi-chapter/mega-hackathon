import connect from "../../assets/connect.png";
import charities from "../../assets/charities.png"; // Corrected image
import donor from "../../assets/donor.png"; // Corrected image
import { NavLink } from "react-router-dom";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 md:px-20">
      {/* Card 1 */}
      <div className="flex flex-row md:flex-col bg-white rounded-lg shadow-md overflow-hidden w-full">
        {/* Image */}
        <img
          src={donor}
          alt="Donor"
          className="flex-[2] md:w-full h-48 md:h-auto object-cover min-w-[120px]"
        />
        {/* Content */}
        <div className="p-4 flex-[3] flex flex-col justify-center">
          <h3 className="mt-auto text-xl font-semibold text-gray-900">
            Nearby Charities
          </h3>
          <p className="text-gray-700 mt-2">
            Meet our incredible partner charities that work to fight hunger and
            support those in need.
          </p>
          {/* Button */}
          <NavLink
            to="/our-charities"
            className="mt-auto px-4 py-2 rounded-md font-bold bg-gradient-to-t from-accent-dark to-accent text-black transition duration-300 hover:from-accent-light hover:to-accent text-center"
          >
            Meet Our Charities
          </NavLink>
        </div>
        {/* charities end */}
      </div>

      {/* Card 2 */}
      <div className="flex flex-row md:flex-col bg-white rounded-lg shadow-md overflow-hidden w-full">
        {/* Image */}
        <img
          src={connect}
          alt="Connect"
          className="flex-[2] md:w-full h-48 md:h-auto object-cover min-w-[120px]"
        />
        {/* Content */}
        <div className="p-4 flex-[3] flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900">Our Donors</h3>
          <p className="text-gray-700 mt-2">
            Meet our prestigious donors who help us fight food waste and hunger
            through their generosity.
          </p>
          {/* Button */}
          <NavLink
            to="/our-donors"
            className="mt-auto px-4 py-2 rounded-md font-bold bg-gradient-to-t from-accent-dark to-accent text-black transition duration-300 hover:from-accent-light hover:to-accent text-center"
          >
            <button>Meet Our Donors</button>
          </NavLink>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-row md:flex-col bg-white rounded-lg shadow-md overflow-hidden w-full">
        {/* Image */}
        <img
          src={charities}
          alt="Charities"
          className="flex-[2] md:w-full h-48 md:h-auto object-cover min-w-[120px]"
        />
        {/* Content */}
        <div className="p-4 flex-[3] flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900">Guidelines</h3>
          <p className="text-gray-700 mt-2">
            Follow our safety guidelines to ensure proper storage, handling, and
            transportation of donated food.
          </p>
          {/* Button */}
          <NavLink
            to="/guidelines"
            className="mt-auto px-4 py-2 rounded-md font-bold bg-gradient-to-t from-accent-dark to-accent text-black transition duration-300 hover:from-accent-light hover:to-accent text-center"
          >
            <button>Read Guidelines</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cards;
