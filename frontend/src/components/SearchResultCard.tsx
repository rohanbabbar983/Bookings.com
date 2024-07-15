import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
  myHotelPage?: boolean;
};

const SearchResultCard = ({ hotel, myHotelPage }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-gray-300 rounded-lg p-4 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="w-full h-[200px] md:h-[250px] overflow-hidden rounded-lg">
        <img
          src={hotel.imageUrls[0]}
          alt={`${hotel.name} image`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-rows-[1fr_1fr_1fr] md:grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center mb-1">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-black" />
              ))}
            </span>
            <span className="ml-2 text-sm text-gray-600">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-xl font-bold cursor-pointer hover:underline">
          {hotel.name.toUpperCase()}
          </Link>
        </div>
        <div className="overflow-hidden text-ellipsis">
          <p className="line-clamp-3 font-light text-gray-700">{hotel.description}</p>
        </div>
        <div className="grid grid-cols-[190px_1fr] mt-2">
          <div className="flex gap-1 items-center flex-wrap">
            {hotel.facilities.slice(0, 2).map((facility, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-full font-semibold text-[10px] whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 2 && (
              <span className="text-[10px] text-gray-600">
                +{hotel.facilities.length - 2} more
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-md text-gray-800">
              ${hotel.pricePerNight} per night
            </span>
            {myHotelPage ? (
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-black text-white px-3 py-1 font-semibold text-md rounded-full hover:bg-gray-800 transition-colors duration-300"
              >
                Edit Hotel
              </Link>
            ) : (
              <Link to={`/detail/${hotel._id}`} className="bg-black flex items-center justify-center text-white px-3 py-1 font-semibold text-md rounded-full hover:bg-gray-800 transition-colors duration-300">
                View More
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
