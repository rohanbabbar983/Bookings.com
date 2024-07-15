import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api/api-clients"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";
const EditHotel = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
      }, []);
  const {hotelId}= useParams();
  const {data: hotel} = useQuery("fetchMyHotelById", ()=> apiClient.fetchMyHotelById(hotelId || ""),{
    enabled: !!hotelId,
  });
  const { showToast } = useAppContext();
  const {mutate ,isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
  });
  const handleSave = (hotelFormData: FormData)=>{
    mutate(hotelFormData);
  }

  return(
    <ManageHotelForm isLoading={isLoading} onSave={handleSave} hotel={hotel}/>
  )
}

export default EditHotel;