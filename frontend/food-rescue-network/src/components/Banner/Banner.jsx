import peopleLarge from "../../assets/peopleLarge.png";
import peopleSmall from "../../assets/peopleSmall.png";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-full flex flex-col md:flex-row-reverse items-center justify-center ">
      {/* Render images for screen sizes */}
      <div className="lg:max-w-2xl md:max-w-3/5 flex justify-center self-start">
        {/* Large Screen Image */}
        <img
          src={peopleLarge}
          alt="People Large"
          className="w-full h-auto hidden md:block"
        />

        {/* Small Screen Image */}
        <img
          src={peopleSmall}
          alt="People Small"
          className="w-3xl object-cover block md:hidden"
        />
      </div>

      {/* Text Content (Bottom on small screens, Left on large screens) */}
      <div className="w-full md:w-1/2 text-center md:text-left p-10">
        <h1 className="text-4xl md:text-2xl lg:text-4xl font-bold text-gray-900 ">
          Rescue Food,
        </h1>
        <h2 className="text-4xl md:text-2xl lg:text-4xl font-bold text-gray-900 mt-2">
          Feed Those in{" "}
          <span className="relative text-accent-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:bg-accent-light after:transition-width after:duration-400 hover:after:w-full">
            Need
          </span>
        </h2>

        {/* Buttons */}
        {/* Buttons */}
        <div className="mt-6 flex justify-center md:justify-start gap-4 w-full">
          {/* <NavLink to="/login">
            <button className="px-6 py-2 w-full max-w-[200px] sm:w-auto bg-linear-to-t from-accent-dark to-accent text-black rounded-lg transition duration-300 hover:from-accent-light hover:to-accent">
              Login
            </button>
          </NavLink> */}

          <NavLink to="/register">
            <button className="px-6 py-2 w-full max-w-[200px] sm:w-auto bg-linear-to-t from-accent-dark to-accent text-black rounded-lg transition duration-300 hover:from-accent-light hover:to-accent">
              Sign Up
            </button>
          </NavLink>
        </div>

        {/* Buttons */}
      </div>
    </section>
  );
};

export default Banner;
