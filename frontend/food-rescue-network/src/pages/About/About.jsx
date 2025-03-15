import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";
import heartOne from "../../assets/heart-one.png";
import heartTwo from "../../assets/heart-two.png";
import imageOne from "../../assets/image-one.png";
import imageTwo from "../../assets/image-two.png";

const About = () => {
  return (
    <>
      <NavBar /> {/* Include Navbar */}
      <main className="mt-20 min-h-screen flex flex-col w-full">
        <div className="relative w-3/4">
          <p className="relative px-10 z-10 text-lg max-w-3xl ml-0 md:ml-0">
            The Food Resource Network is dedicated to reducing food waste,
            alleviating hunger, and fostering sustainable food solutions. We
            believe that no one should go hungry while edible food goes to
            waste.
          </p>
          <img
            className="absolute md:right-20 lg:right-100 right-0 -top-10 w-35 md:w-45 lg:w-50 opacity-50 -z-10"
            src={heartTwo}
            alt="Heart Illustration"
          />
        </div>
        {/* second part */}
        <div className=" relative flex flex-col md:flex-row-reverse items-center md:items-start w-full mt-30">
          {/* ImageTwo behind h1 (stays on the right) */}
          <div className="relative w-full md:w-1/2 text-center">
            <img src={imageTwo} alt="" className="mx-auto w-90 md:w-96 -z-10" />
            <h1 className="absolute inset-0 top-5 text-3xl font-bold z-10">
              About Us
            </h1>
          </div>
          {/* ImageOne - Moves to the left for medium & large screens */}
          <div className="mt-5 md:w-full flex justify-center md:justify-start">
            <img src={imageOne} alt="" className="w-full md:w-full" />
          </div>
        </div>

        {/* second part */}

        {/* Third part */}
        {/* Third part */}
        <div className="mt-20 mb-10 md:mb-20 relative w-full flex justify-end pr-10">
          {/* Wrapper to control relative positioning */}
          <div className="relative w-[80%] md:w-[60%] lg:w-[50%]">
            {/* Heart Image Positioned on the Top Left of the Paragraph */}
            <img
              className="absolute left-0 top-0 md:-top-5 md:-left-10 lg:-top-10 w-20 md:w-40 lg:w-50 opacity-50 -z-10"
              src={heartOne}
              alt="Heart Illustration"
            />

            {/* Paragraph Moved to the Right */}
            <p className="px-10 relative z-10 text-lg">
              By connecting food donors with local communities and
              organizations, we strive to bridge the gap between excess and
              need. Through collaboration, innovation, and advocacy, we work
              towards a future where nutritious food is accessible to all while
              reducing environmental impact.
            </p>
          </div>
        </div>

        {/* third part */}
      </main>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default About;
