import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import PriceFilter from "./PriceFilter";
import FacilitiesFilter from "./FacilitiesFilter";
import StarRatingFilter from "./StarRatingFilter";
import HotelTypesFilter from "./HotelTypesFilter";

type Props = {
  selectedprice?: number;
  onPriceChange: (value?: number) => void;
  selectedFacilities: string[];
  setselectedFacilities: (facilities: string[]) => void;
  selectedStars: string[];
  setselectedStars: (stars: string[]) => void;
  selectedHotelTypes: string[];
  setselectedHotelTypes: (hotelType: string[]) => void;
  sortOption: string;
  setsortOption: (sortoption: string) => void;
};

const MobileFilter = ({
  selectedprice,
  onPriceChange,
  selectedFacilities,
  setselectedFacilities,
  selectedStars,
  setselectedStars,
  selectedHotelTypes,
  setselectedHotelTypes,
  sortOption,
  setsortOption,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempPrice, settempPrice] = useState<number | undefined>(selectedprice);
  const [tempFacility, settempFacility] =
    useState<string[]>(selectedFacilities);
  const [tempStars, settempStars] = useState<string[]>(selectedStars);
  const [tempHotelTypes, settempHotelTypes] =
    useState<string[]>(selectedHotelTypes);
  const [tempSortOption, settempSortOption] = useState<string>(sortOption);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Facility = event.target.value;
    settempFacility((prevState) =>
      event.target.checked
        ? [...prevState, Facility]
        : prevState.filter((facility) => facility !== Facility)
    );
  };
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    settempStars((prevState) =>
      event.target.checked
        ? [...prevState, starRating]
        : prevState.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const HotelType = event.target.value;
    settempHotelTypes((prevState) =>
      event.target.checked
        ? [...prevState, HotelType]
        : prevState.filter((hotelType) => hotelType !== HotelType)
    );
  };
  const HandleApplyChanges = () => {
    onPriceChange(tempPrice);
    setselectedFacilities(tempFacility);
    setselectedStars(tempStars);
    setselectedHotelTypes(tempHotelTypes);
    setsortOption(tempSortOption);
    toggleMenu();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-gray-800 flex items-center w-full justify-between bg-white rounded-md focus:outline-none"
      >
        <span>Filter and sort by</span>
        <IoFilter />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          <div
            className={`fixed inset-y-0 right-0 bg-white w-full shadow-xl p-4 transform transition-transform duration-500 ease-in-out z-50 ${
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
            <div className="max-h-[80vh] mt-10 z-10 space-y-3 flex flex-col overflow-y-auto p-4">
              <PriceFilter
                onChange={(value?: number) => settempPrice(value)}
                selectedprice={tempPrice}
              />
              <div className="w-full">
              <h4 className="text-md font-semibold mb-2">Sort By</h4>

                <select
                  value={tempSortOption}
                  className="p-2 border w-full rounded-md "
                  onChange={(event) => settempSortOption(event.target.value)}
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
              <FacilitiesFilter
                selectedFacilities={tempFacility}
                onChange={handleFacilityChange}
              />
              <StarRatingFilter
                selectedStars={tempStars}
                onChange={handleStarsChange}
              />
              <HotelTypesFilter
                selectedHotelTypes={tempHotelTypes}
                onChange={handleHotelTypeChange}
              />
            </div>
            <div className="fixed flex items-center justify-center bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
              <button
                onClick={HandleApplyChanges}
                className=" bg-black text-white px-10 py-4 rounded-md shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileFilter;
