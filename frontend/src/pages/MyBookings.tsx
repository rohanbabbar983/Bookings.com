import { useQuery } from "react-query";
import * as apiClient from "../api/api-clients";
import BookingResultCard from "../components/BookingResultCard";

const MyBookings = () => {
  const { data: hotels } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!hotels || hotels.length === 0) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center font-bold">
        No bookings found...
      </div>
    );
  }

  const today = new Date();

  return (
    <div className="min-h-screen flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Active Bookings</h2>
        <div className="grid grid-cols-1 gap-8">
          {hotels.flatMap(hotel =>
            hotel.bookings
              .filter(booking => new Date(booking.checkOut) >= today)
              .map(booking => (
                <BookingResultCard key={booking._id} booking={booking} hotel={hotel} />
              ))
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Expired Bookings</h2>
        <div className="grid grid-cols-1 gap-8">
          {hotels.flatMap((hotel) =>
            hotel.bookings
              .filter(booking => new Date(booking.checkOut) < today)
              .map((booking) => (
                <BookingResultCard key={booking._id} booking={booking} hotel={hotel} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
