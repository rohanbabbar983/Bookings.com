import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api/api-clients";
import { useEffect, useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import MobileFilter from "../components/MobileFilter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setselectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setselectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setselectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setselectedPrice] = useState<number | undefined>();
  const [sortOption, setsortOption] = useState<string>("");
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setselectedStars((prevState) =>
      event.target.checked
        ? [...prevState, starRating]
        : prevState.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const HotelType = event.target.value;
    setselectedHotelTypes((prevState) =>
      event.target.checked
        ? [...prevState, HotelType]
        : prevState.filter((hotelType) => hotelType !== HotelType)
    );
  };
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Facility = event.target.value;
    setselectedFacilities((prevState) =>
      event.target.checked
        ? [...prevState, Facility]
        : prevState.filter((facility) => facility !== Facility)
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, [page]);
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-white">
        <div className=" xl:space-y-5 hidden xl:block">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedprice={selectedPrice}
            onChange={(value?: number) => setselectedPrice(value)}
          />
        </div>
        <div className="xl:hidden">
            <MobileFilter sortOption={sortOption} setsortOption={setsortOption} selectedHotelTypes={selectedHotelTypes} setselectedHotelTypes={setselectedHotelTypes} selectedStars={selectedStars} setselectedStars={setselectedStars} selectedFacilities={selectedFacilities} setselectedFacilities={setselectedFacilities} selectedprice={selectedPrice} onPriceChange={(value?: number) => setselectedPrice(value)}/>
        </div>
      
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            className="p-2 border rounded-md hidden md:block"
            onChange={(event) => setsortOption(event.target.value)}
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (Low to High)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (High to Low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <div key={hotel._id}>
            <SearchResultCard hotel={hotel} />
          </div>
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
