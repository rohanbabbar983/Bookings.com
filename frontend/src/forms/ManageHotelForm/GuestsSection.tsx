import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="mt-3">
      <h2 className="text-gray-700  text-sm font-bold">Guests</h2>
      <div className="flex flex-col mt-3 rounded bg-gray-200 p-5 md:justify-between gap-4 md:items-center md:flex-row">
        <label className="text-gray-700  flex-1 text-[10px] font-bold">
            Adults
                <input type="number" min={1} placeholder="eg. 2"  className="border rounded w-full py-1 px-2 font-normal" {...register("adultCount",{required:"This field is required"})}></input>
                {errors.adultCount && (
                    <span className="text-red-500">{errors.adultCount.message}</span>
                ) }
        </label>
        <label className="text-gray-700 flex-1 text-[10px] font-bold">
             Children
                <input type="number" min={1} placeholder="eg. 2"  className="border rounded w-full py-1 px-2 font-normal" {...register('childCount',{required:"This field is required"})}></input>
                {errors.childCount && (
                    <span className="text-red-500">{errors.childCount.message}</span>
                ) }
        </label>
    </div>

  
   </div>
  );
};

export default GuestsSection;
