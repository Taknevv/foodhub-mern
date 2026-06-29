import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              FoodHub
            </h2>

            <p className="mt-3 text-sm">
              Buy, sell and discover homemade and restaurant food easily.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Sell Food</li>
              <li>Favorites</li>
              <li>Profile</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">
              <FaGithub className="hover:text-white cursor-pointer" />
              <FaLinkedin className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-sm">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;