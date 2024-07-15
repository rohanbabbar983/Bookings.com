import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api/api-clients";
import RegisterFirstHotel from "../components/RegisterFirstHotel";
import SearchResultCard from "../components/SearchResultCard";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (hotelData?.length === 0) {
    return <RegisterFirstHotel />;
  }

  return (
    <div className="min-h-screen flex-col">
      <div className="bg-white border-l-8  shadow-xl border-black text-black p-4 mb-6" role="alert">
        <p className="font-bold">Expand Your Portfolio</p>
        <p>
          <Link to="/add-hotel" className="text-blue-700 underline">
            List more properties
          </Link>{" "}
          to reach more customers and grow your business.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between  mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">My Hotels</h2>
      </div>
      <div className="grid mt-6 grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <SearchResultCard key={hotel._id} hotel={hotel} myHotelPage={true} />
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
