import { BookingType, HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  booking: BookingType;
  hotel: HotelType;
};

const BookingResultCard = ({ booking, hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-gray-300 rounded-lg p-4 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="w-full h-[200px] md:h-[250px] overflow-hidden rounded-lg">
        <img
          src={hotel.imageUrls[0]}
          alt={`${hotel.name} image`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-rows-[40px_120px_1fr]  md:grid-rows-[1fr_2fr_1fr]">
        <div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl line-clamp-1 font-bold cursor-pointer hover:underline"
          >
            {hotel.name.toUpperCase()}
          </Link>
        </div>
        <div className="overflow-hidden text-ellipsis">
          <div>
            <div>
              <span className="font-semibold mr-2">Location: </span>
              <span>{`${hotel.city}, ${hotel.country}`}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Check-In Date: </span>
              <span>{new Date(booking.checkIn).toDateString()}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Check-Out Date: </span>
              <span>{new Date(booking.checkOut).toDateString()}</span>
            </div>

            <div>
              <span className="font-semibold mr-2">Guests:</span>
              <span>
                {booking.adultCount} adults, {booking.childCount} children
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-t-2 border-gray-300 justify-start items-center p-4 gap-1">
          <span className="font-bold text-2xl ">
            Total Amount : ${booking.totalCost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingResultCard;
