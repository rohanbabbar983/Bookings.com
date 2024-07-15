import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto ">
        <div className="flex flex-row justify-between items-center">
          <div className=" lg:mb-0 flex items-center justify-center lg:text-left">
            <span className="text-3xl text-white font-bold tracking-tight">
              <Link to={"/"}>Bookings.com</Link>
            </span>
          </div>
          <div className="flex justify-between items-center gap-5">
            <a
              href="https://linkedin.com/in/rohan-babbar-039512239"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaLinkedin size={25} />
            </a>
            <a
              href="https://github.com/rohanbabbar983/Bookings.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <FaGithub size={25} />
            </a>
          </div>
        </div>
        <div className="mt-10 text-center space-x-2 lg:text-right">
          <p className="text-sm">&copy; 2024 All rights reserved.</p>
        <div className="flex justify-center gap-2 items-center md:justify-end">
        <a href="/privacy-policy" className="text-sm hover:text-gray-400">
            Privacy Policy{" "}
          </a>{" "}
          |
          <a href="/terms-of-service" className="text-sm hover:text-gray-400">
            Terms of Service
          </a>

        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
