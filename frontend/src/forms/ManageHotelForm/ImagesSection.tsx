import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
      } = useFormContext<HotelFormData>();

      const existingImageUrls = watch("imageUrls");
      const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> , imageUrl : string)=>{
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url)=> url !== imageUrl))
      }


      return(
        <div className="3">
            <h2 className="text-gray-700  text-sm font-bold">Images</h2>
            <div className="border mt-3 rounded p-2 flex flex-col gap-4">
            {existingImageUrls && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {existingImageUrls.map((url)=>(
                        <div className="relative group">
                            <img src={url} className="min-h-full object-cover" alt="" />
                            <button onClick={(event)=>handleDelete(event,url)}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                        </div>
                    ))}
                </div>
            )}

                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal" {...register("imageFiles",{
                    validate: (imageFiles)=>{
                        const totalLength = imageFiles.length + (existingImageUrls?.length || 0 );
                        if(totalLength===0){
                            return "At least one image should be added";
                        }
                        if(totalLength>6){
                            return "Total number of images cannot be more than 6";
                        }
                    }
                })} />
            </div>
            {errors.imageFiles && (
                    <span className="text-red-500 font-bold text-sm">{errors.imageFiles.message}</span>
             ) }

            
        </div>

      )
}

export default ImagesSection;