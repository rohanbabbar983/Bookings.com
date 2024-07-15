import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api/api-clients";
import { AiFillStar } from "react-icons/ai";
import ImageSlider from "../components/ImageSlider";
import { useEffect, useState } from "react";
import Facility from "../components/FacilityDetail";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
const Detail = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const [ReadMore, setReadMore] = useState(false);

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-1">
          <span className="flex">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-black" />
            ))}
          </span>
          <span className="ml-2 text-sm text-gray-600">{hotel.type}</span>
        </div>
        <h2 className="line-clamp-1 text-2xl font-bold cursor-pointer hover:underline">
          {hotel.name.toUpperCase()} ({hotel.city.toUpperCase() }, {hotel.country.toUpperCase()})
        </h2>
      </div>
      <div>
        <ImageSlider images={hotel.imageUrls}/>
      </div>
      <div>
        <Facility facilities={hotel.facilities}/>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div>
        <div className={`whitespace-pre-line  ${!ReadMore && "line-clamp-4"} md:line-clamp-none text-lg`}>{hotel.description}</div>
        <div onClick={()=>setReadMore(!ReadMore)} className="md:hidden flex mt-3 items-center justify-center"> 
          {!ReadMore ? (<>Read more  <FaAngleDown className="ml-1" /></>) : (<>Read less  <FaAngleUp className="ml-1"/></>)}
          
        </div>
        </div>
        <div className="h-fit md:px-8">
          <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>


        </div>

      </div>
     
    </div>
  );
};

export default Detail;
