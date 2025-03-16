import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import background from "../../assets/background.png";
import { useEffect } from "react";

const donors = [
  {
    id: 1,
    name: "The Place",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741846542/pexels-igor-starkov-233202-914388_tffk7l.jpg",
    description:
      "The Place is a high-end fine dining restaurant known for its exquisite culinary creations and commitment to sustainability. Dedicated to reducing food waste, the restaurant donates surplus gourmet meals to local charities, ensuring that no perfectly good food goes to waste. With a menu crafted from seasonal ingredients, The Place has partnered with various food banks to provide high-quality, nutritious meals to those in need. Their chefs take pride in preparing dishes with fresh, locally sourced ingredients, and any leftovers are carefully packaged and delivered to shelters",
  },
  {
    id: 2,
    name: "Farm to Table",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741846777/farm-to-table_fa2e8r.jpg",
    description:
      "Farm to Table is a sustainable restaurant and grocery store that works closely with local farmers to provide fresh, organic ingredients to customers. Their farm-to-fork philosophy not only supports local agriculture but also helps fight hunger by redirecting excess food to those who need it most. Their partnerships with community organizations have helped provide nutritious, balanced meals to families facing food insecurity.",
  },
  {
    id: 3,
    name: "Desert Never Hurts",
    image:
      "https://res.cloudinary.com/dcorur9qo/image/upload/v1741846779/desert-never-hurts_ebsnrr.jpg",
    description:
      "Desert Never Hurts is a popular bakery and dessert shop known for its delicious pastries, cakes, and confections. While their treats are loved by many, they also ensure that unsold but perfectly fresh desserts find their way to those who need them. Instead of discarding surplus baked goods, they donate to shelters, community centers, and food relief programs. Their mission is to spread joy through food, ensuring that no dessert goes uneaten while helping people in need.",
  },
];

const OurDonors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative min-h-screen">
      <NavBar />

      <div className="relative w-full mx-auto py-20 text-center">
        {/* Gradient Heading */}
        <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-bl from-primary-dark to-primary bg-clip-text text-transparent">
          Our Donors
        </h1>
        <p className="text-lg md:text-xl text-black mt-4">
          These incredible donors help us reduce food waste and support those in
          need.
        </p>

        {/* Donors Section with Full-Width Background */}
        <div className="relative mt-12 w-full">
          {/* Background Behind Donors */}
          <div
            className="absolute inset-0 w-full h-full  bg-center bg-opacity-80"
            style={{ backgroundImage: `url(${background})` }}
          ></div>

          {/* Donor Descriptions - Positioned Above Background */}
          <div className="relative z-10 w-full max-w-7xl mx-auto py-16 px-8">
            {donors.map((donor, index) => (
              <div
                key={donor.id}
                className={`flex flex-col md:flex-row items-center gap-8 py-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Donor Image */}
                <img
                  src={donor.image}
                  alt={donor.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />

                {/* Donor Name & Description */}
                <div className="text-left md:w-3/5 bg-white/30 backdrop-blur-md border border-white/40 p-6 rounded-lg shadow-md">
                  <h3 className="text-3xl font-bold text-black">
                    {donor.name}
                  </h3>
                  <p className="text-lg text-black mt-3">{donor.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* donor description */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurDonors;
