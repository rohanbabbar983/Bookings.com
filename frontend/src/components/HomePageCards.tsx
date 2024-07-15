import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

type Props = {
  hotel: HotelType;
};

const HomePageCards = ({ hotel }: Props) => {
  return (
    <div
     
      className="grid min-w-[20rem] grid-cols-1 border border-gray-300 rounded-lg p-4 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <Link  to={`/detail/${hotel._id}`} className="w-full h-[150px] overflow-hidden rounded-lg">
        <img
          src={hotel.imageUrls[0]}
          alt={`${hotel.name} image`}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="grid grid-rows-[1fr_1fr_1fr]">
        <div>
          <div className="flex items-center mb-1">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-black" />
              ))}
            </span>
            <span className="ml-2 text-sm text-gray-600">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-xl font-bold cursor-pointer hover:underline"
          >
            {hotel.name.toUpperCase()}
          </Link>
        </div>
        <div className="overflow-hidden text-ellipsis">
          <p className="line-clamp-3 font-light text-gray-700">
            {hotel.description}
          </p>
        </div>
        <div className="grid grid-cols-[190px_1fr] mt-2">
          <div className="flex items-center -ml-4  justify-start">
            <span className="font-bold flex gap-1 bg-gray-800 shadow-md py-1 px-2 rounded-r-md items-center justify-center">
              <IoLocationSharp className="text-white" />
              <span className="flex items-start text-white" >{`${hotel.city} , ${hotel.country}`}</span>
            </span>
          </div>
          <Link  to={`/detail/${hotel._id}`} className="font-bold flex items-center justify-center">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageCards;
