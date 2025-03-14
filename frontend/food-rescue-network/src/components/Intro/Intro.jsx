import background from "../../assets/background.png";

const Intro = () => {
  return (
    <div className="relative w-11/12 max-w-4xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-xl">
      {/* Background Image properly centered with white edges visible */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Glass Div */}
      <div
        className="relative z-10 w-3/4 md:w-1/2 bg-white/70 backdrop-blur-md 
          border border-gray-300 p-6 text-center rounded-tl-3xl rounded-br-3xl 
                hover:rounded-tl-none hover:rounded-br-none 
                hover:rounded-tr-3xl hover:rounded-bl-3xl 
                transition-all duration-300"
      >
        <p className="text-xs text-left font-bold text-primary-dark tracking-widest">
          Support
        </p>
        <h3 className="text-lg font-bold mb-3">Food Resource Network</h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Food Resource Network connects restaurants and food businesses with
          charities to reduce waste and fight hunger. By redistributing surplus
          food, we ensure nutritious meals reach those in need while promoting
          sustainability.
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-3">
          Your support helps us create a more efficient, fair, and waste-free
          food system. Whether you're a donor, charity, or advocate, you can
          make a difference. Join us in turning excess into impact!
        </p>
      </div>
    </div>
  );
};

export default Intro;
