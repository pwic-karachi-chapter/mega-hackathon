import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import background from "../../assets/background.png";
import { useEffect } from "react";

const charities = [
  {
    id: 1,
    name: "Harvest Hope Foundation",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741849184/harvest-hope_jccivn.jpg",
    description:
      "Harvest Hope Foundation is dedicated to eradicating hunger by rescuing surplus food and distributing it to families in need. Partnering with local restaurants, farmers, and grocery stores, they ensure that excess fresh produce and meals reach the most vulnerable communities. Through their mobile food bank and meal programs, they have provided thousands of meals to low-income families, seniors, and homeless individuals.",
  },

  {
    id: 2,
    name: "Full Plate Project",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741849184/full-plate_w7ww1i.jpg",
    description:
      "The Full Plate Project operates as a bridge between food charitys and those facing food insecurity. They collect surplus food from restaurants, farms, and grocery stores, redistributing it through food pantries and soup kitchens. Their volunteers work tirelessly to reduce food waste and combat hunger, ensuring that every meal served makes a difference in someone’s life.",
  },

  {
    id: 3,
    name: "Feeding Hands Network",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741849182/feeding-hands_tgzjwq.jpg",
    description:
      "Feeding Hands Network is a volunteer-driven initiative that sets up community food stations in urban areas to serve free meals to those in need. They specialize in disaster relief food aid, ensuring that victims of natural disasters have immediate access to warm, nutritious meals. Their mission is simple: to serve, nourish, and uplift people through the power of shared meals.",
  },
];

const OurCharities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <NavBar />

      <div className="relative w-full mx-auto py-20 text-center">
        {/* Gradient Heading */}
        <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-bl from-primary-dark to-primary bg-clip-text text-transparent">
          Our Charities
        </h1>
        <p className="text-lg md:text-xl text-black mt-4">
          These amazing charities work tirelessly to fight hunger, rescue
          surplus food, and provide meals to those in need.
        </p>

        {/* charities Section with Full-Width Background */}
        <div className="relative mt-12 w-full">
          {/* Background Behind charities */}
          <div
            className="absolute inset-0 w-full h-full  bg-center bg-opacity-80"
            style={{ backgroundImage: `url(${background})` }}
          ></div>

          {/* charity Descriptions - Positioned Above Background */}
          <div className="relative z-10 w-full max-w-7xl mx-auto py-16 px-8">
            {charities.map((charity, index) => (
              <div
                key={charity.id}
                className={`flex flex-col md:flex-row items-center gap-8 py-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* charity Image */}
                <img
                  src={charity.image}
                  alt={charity.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />

                {/* charity Name & Description */}
                <div className="text-left md:w-3/5 bg-white/30 backdrop-blur-md border border-white/40 p-6 rounded-lg shadow-md">
                  <h3 className="text-3xl font-bold text-black">
                    {charity.name}
                  </h3>
                  <p className="text-lg text-black mt-3">
                    {charity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* charity description */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurCharities;
