import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      {/* Name */}
      <label className="text-gray-700  text-sm font-bold">
        Name
        <input
          placeholder="eg. Haayat"
          type="text"
          className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-2 flex-col md:flex-row">
        {/* City */}
        <label className="text-gray-700 flex-1 text-sm font-bold">
          City
          <input
            placeholder="eg. Delhi"
            type="text"
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        {/* Country */}
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Country
          <input
            placeholder="eg. India"
            type="text"
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 flex-1 text-sm font-bold">
        Description
        <textarea
          rows={10}
          placeholder="eg. Haayat is a one of the most popular ......"
          className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex flex-col md:justify-between gap-2 md:items-center md:flex-row">
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Price Per Night
          <input
            type="number"
            min={1}
            placeholder="eg. 0.00"
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="border border-gray-300 rounded w-full p-1 text-gray-700 font-normal"
          >
            <option value="" className="text-sm  font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} className="text-sm" value={number}>
                {number}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
