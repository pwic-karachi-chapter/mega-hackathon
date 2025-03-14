import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#aaad9b] text-white py-10">
      {" "}
      {/* Increased padding */}
      <div className="max-w-4xl mx-auto px-3">
        {/* Top Row - Contact & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Column 1: Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3">Get In Touch</h4>{" "}
            {/* More space */}
            <p className="text-sm">
              For donations, please contact{" "}
              <a
                href="mailto:donor@foodrescuenetwork.org"
                className="underline hover:text-gray-200"
              >
                donor@foodrescuenetwork.org
              </a>
              .<br />
              For all other non-donation inquiries, please send inquiries to{" "}
              <a
                href="mailto:info@foodrescuenetwork.org"
                className="underline hover:text-gray-200"
              >
                info@foodrescuenetwork.org
              </a>
              .
            </p>
          </div>

          {/* Column 2: Socials */}
          <div className="flex gap-5">
            {" "}
            {/* More spacing between icons */}
            <a
              href="#"
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-6 h-6" /> {/* Increased icon size */}
            </a>
            <a
              href="#"
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              aria-label="Twitter"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Bottom Row - Copyright */}
        <div className="text-center text-sm mt-8">
          &copy; 2025 — Food Rescue Network
        </div>
      </div>
    </footer>
  );
};

export default Footer;
