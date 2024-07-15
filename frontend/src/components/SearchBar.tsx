import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 xl:mx-20 sm:mx-0 w-full xl:w-auto text-white rounded-lg border flex xl:items-center flex-col lg:flex-row border-slate-300 shadow-gray-400 shadow-lg bg-white"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="xl:border-r border-gray-300">
          <div className="flex items-center p-2 xl:p-2 xl:m-2 hover:bg-gray-100 rounded-lg">
            <MdTravelExplore size={25} className="mr-2 text-gray-500" />
            <label className="flex flex-col flex-grow text-xs text-gray-600 font-semibold">
              Destination:
              <input
                placeholder="Where are you going?"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="xl:border-r flex items-center border-gray-300">
          <div className="flex w-full items-center hover:bg-gray-100 p-2 xl:p-2 xl:m-2 gap-2 rounded-lg">
            <FaUserGroup size={20} className="mr-2 text-gray-500" />
            <label className="flex flex-col xl:mr-4 flex-grow border-r border-gray-200 text-xs text-gray-600 font-semibold">
              Adults:
              <input
                placeholder="1"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                type="number"
                min={1}
                max={20}
                value={adultCount}
                onChange={(event) => setAdultCount(parseInt(event.target.value))}
              />
            </label>
            <label className="flex flex-col flex-grow mr-2 text-xs text-gray-600 font-semibold">
              Children:
              <input
                placeholder="1"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                type="number"
                min={0}
                max={20}
                value={childCount}
                onChange={(event) => setChildCount(parseInt(event.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="xl:border-r border-gray-300">
          <div className="flex items-center hover:bg-gray-100 p-2 xl:p-2 xl:m-2 rounded-lg">
            <SlCalender size={20} className="mr-2 text-gray-600" />
            <label className="flex flex-col flex-grow mr-2 text-xs text-gray-600 font-semibold">
              Check-in Date:
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="--/--/----"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                wrapperClassName="w-full"
              />
            </label>
          </div>
        </div>

        <div className="">
          <div className="flex items-center hover:bg-gray-100 p-2 xl:p-2 xl:m-2 rounded-lg">
            <SlCalender size={20} className="mr-2 text-gray-600" />
            <label className="flex flex-col flex-grow mr-2 text-xs text-gray-600 font-semibold">
              Check-out Date:
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date as Date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn}
                maxDate={maxDate}
                placeholderText="--/--/----"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                wrapperClassName="w-full"
              />
            </label>
          </div>
        </div>
      </div>
       <button
        type="submit"
        className="m-2 flex items-center justify-center bg-black text-white px-4 py-3 rounded-lg "
      >
       <FaSearch className="mr-2" />
       Search
      </button>
    </form>
  );
};

export default SearchBar;
