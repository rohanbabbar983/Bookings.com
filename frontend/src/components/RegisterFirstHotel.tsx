import { Link } from "react-router-dom";

const RegisterFirstHotel = () => {
  return (
    <div className="flex items-center justify-center  text-gray-900">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-gray-300 text-gray-900 text-center py-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-black font-bold leading-tight">
            List Your Hotel with Us
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Unlock the potential to grow your business and increase your bookings.
          </p>
        </header>
        <main className="p-4 sm:p-8 space-y-8">
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why List with Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Global Exposure</h3>
                <p className="text-gray-700">
                  Get your hotel in front of millions of travelers worldwide.
                </p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Boost Bookings</h3>
                <p className="text-gray-700">
                  Maximize your occupancy rates with our platform's tools.
                </p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-gray-700">
                  Manage your property effortlessly with our intuitive dashboard.
                </p>
              </div>
            </div>
          </section>
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Join us today and start reaching more travelers!
            </p>
            <Link
              to="/add-hotel"
              className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:bg-gray-700"
            >
              Register Your Hotel
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RegisterFirstHotel;
