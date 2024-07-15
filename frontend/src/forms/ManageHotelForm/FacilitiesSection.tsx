import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {register, formState:{errors}} = useFormContext<HotelFormData>();

  return(
    <div className="mt-3">
      <h2 className="text-gray-700  text-sm font-bold">Facilities</h2>

      <div className="grid px-2 grid-cols-2 mt-3 md:grid-cols-5 gap-3">
        {hotelFacilities.map((facility)=>(
            <label key={facility} className="text-[12px] md:text-sm items-center  flex gap-1 text-black">
                <input  type="checkbox" value={facility}
                 {...register("facilities", {
                    validate: (facilities)=>{
                        if(facilities && facilities.length>0){
                            return true;
                        }else{
                            return "At least one facility is required";
                        }

                    }
                 })} />
                {facility}
            </label>
        ))}
        
      </div> 
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )} 


    </div>
  )
}

export default FacilitiesSection;