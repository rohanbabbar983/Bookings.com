import { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const MobileNav = () => {
  const { isLoggedIn } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-800 bg-white rounded-md focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          <div
            className={`fixed inset-y-0 right-0 bg-white w-1/2 shadow-xl p-4 transform transition-transform duration-500 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-[1rem] p-2 text-gray-800 bg-gray-100 rounded-full focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <nav
              onClick={toggleMenu}
              className="flex flex-col items-start justify-between mt-20 space-y-4"
            >
              {isLoggedIn ? (
                <>
                  <Link
                    to="/my-bookings"
                    className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/my-hotels"
                    className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
                  >
                    My Hotels
                  </Link>

                  <div className="w-full">
                    <SignOutButton wfull={true} />
                  </div>
                </>
              ) : (
                <Link
                  to="/sign-in"
                  className="text-gray-800 bg-white border w-full border-gray-300 hover:bg-gray-100 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
