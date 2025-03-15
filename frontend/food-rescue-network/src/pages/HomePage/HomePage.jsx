import Banner from "../../components/Banner/Banner";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer/Footer";
import Intro from "../../components/Intro/Intro";
import Navbar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div>
        <Banner />
        <Intro />
        <Cards />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
