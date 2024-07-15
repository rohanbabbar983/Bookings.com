import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};
type props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};
const ManageHotelForm = ({ onSave, isLoading, hotel }: props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
<div className="border bg-gray-50 min-h-[80vh] p-8 sm:p-6 mb-8 border-gray-300  text-black rounded-md">
  <div className=" mx-auto space-y-4">
    <h2 className="text-xl md:px-5  sm:text-2xl md:text-3xl font-bold mb-4">Important Information</h2>
    <ul className="list-disc gap-2  md:px-6  text-gray-700">
      <li className="text-sm sm:text-base md:text-lg mb-2">
        Welcome to the hotel registration form. Please ensure that all required fields are filled out accurately to provide the best experience for our guests. This form will guide you through the process of adding or editing hotel details, including room types, facilities, guest policies, and images. Your cooperation is greatly appreciated.
      </li>
      <li className="text-sm sm:text-base md:text-lg mb-2">
        Should you have any questions or require assistance, please do not hesitate to contact our support team.
      </li>
      <li className="text-sm sm:text-base md:text-lg mb-2">
        Thank you for your attention to detail and commitment to providing an excellent guest experience. We strive to ensure that all information is kept up-to-date and accurate to help guests make informed decisions about their stay.
      </li>
      <li className="text-sm sm:text-base md:text-lg mb-2">
        Please double-check the information you provide, especially room rates and availability, to prevent any inconvenience for our guests. Detailed descriptions and high-quality images of your hotel will enhance the appeal to potential guests.
      </li>
      <li className="text-sm sm:text-base md:text-lg mb-2">
        Accurate guest policies, such as check-in and check-out times, cancellation policies, and additional charges, should be clearly outlined to avoid any misunderstandings. Providing a list of facilities and amenities available at your hotel will help guests choose the right property for their needs.
      </li>
      <li className="text-sm sm:text-base md:text-lg mb-2">
        We appreciate your effort in maintaining high standards of hospitality. Our team is here to support you in creating an exceptional experience for our guests. Should you need to update any information after submission, you can access your profile through the management dashboard.
      </li>
      <li className="text-sm sm:text-base md:text-lg">
        Thank you for your cooperation and for being a valued part of our network. We look forward to a successful partnership and to providing outstanding service to our mutual guests.
      </li>
    </ul>
  </div>
</div>

      <div className="min-h-screen border rounded-lg border-gray-200 bg-gray-50 shadow-lg flex w-full items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col  w-full overflow-hidden"
        >
          <div className="bg-black rounded-t-lg text-white text-center py-8">
            <h2 className="text-3xl font-bold">
              {hotel ? "Edit Hotel" : "Add Hotel"}
            </h2>
          </div>
          <div className="p-3 md:p-8 space-y-6">
            <DetailsSection />
            <TypesSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
          </div>
          <div className="flex items-center justify-center m-3">
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-[#050708] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex disabled:bg-gray-700 items-center me-2 mb-2"
            >
              {isLoading ? "Saving..." : " Register Property "}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ManageHotelForm;
