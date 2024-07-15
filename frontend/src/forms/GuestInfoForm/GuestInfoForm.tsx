import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { FaUserGroup } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
 const search = useSearchContext();
 const {isLoggedIn} =useAppContext();
 const navigate = useNavigate();
 const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues:{
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount

    }
  });


  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData)=>{
    search.saveSearchValues("" ,data.checkIn , data.checkOut , data.adultCount , data.childCount );
    navigate("/sign-in" , {state:{from : location}});
  }

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues("" ,data.checkIn , data.checkOut , data.adultCount , data.childCount );
    navigate(`/hotel/${hotelId}/booking`);



  };

  return (
    <div className="flex flex-col p-4 gap-4 border rounded-md border-gray-300 shadow">
      <h3 className="text-md font-bold">${pricePerNight} per Night</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick) }>
        <div className="grid gric-cols-1 gap-4 items-center ">
          <div className="flex items-center border border-gray-300 hover:bg-gray-100 p-1 rounded-lg">
            <SlCalender size={20} className="mr-2 text-gray-600" />
            <label className="flex flex-col flex-grow mr-2 text-xs text-gray-600 font-semibold">
              Check-in Date:
              <DatePicker
                required
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
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
          <div className="flex items-center border-gray-300 border hover:bg-gray-100 p-1 rounded-lg">
            <SlCalender size={20} className="mr-2 text-gray-600" />
            <label className="flex flex-col flex-grow mr-2 text-xs text-gray-600 font-semibold">
              Check-out Date:
              <DatePicker
                required
                selected={checkOut}
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsEnd
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
          <div className="flex w-full border items-center border-gray-300 hover:bg-gray-100 p-1 gap-2 rounded-lg">
            <FaUserGroup size={20} className="mr-2 text-gray-500" />
            <label className="flex flex-col xl:mr-4 flex-grow border-r border-gray-200 text-xs text-gray-600 font-semibold">
              Adults:
              <input
                placeholder="1"
                className="bg-transparent w-full text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                type="number"
                min={1}
                max={20}
                {...register("adultCount" , {
                    required: "This field is required",
                    min: {
                        value:1,
                        message: "There must be at at least one adult",
                    },
                    valueAsNumber: true,
                })}
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
                {...register("childCount", {
                    valueAsNumber: true
                })}
              />
            </label>
            {errors.adultCount && (
                <span className="text-red font-semibold">{errors.adultCount.message}</span>
            )}
          </div>
          {isLoggedIn ? (
            <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book Now
          </button>
          ) : (
            <button
            type="submit"
            
            className="w-full bg-black text-white py-2 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign in to Book
          </button>

          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
