import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBlog,
  FaHome,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">BloodLink</h2>
          <p className="text-sm">
            Connecting donors with those in need to save lives. Join us to make
            a difference with every drop of blood you give.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/donation-request">Donation Request</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/funding">Give Fund</NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" /> +880 1234 567 890
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> support@bloodconnect.com
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> 123, Main Street, Dhaka,
              Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
