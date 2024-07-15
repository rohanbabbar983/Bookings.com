import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api/api-clients'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

type prop ={
  wfull?: boolean;
}
const SignOutButton = ({wfull}:prop) => {
    const queryClient = useQueryClient();
    const navigate= useNavigate();
    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async () =>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Logout Success !" , type:"SUCCESS"});
            navigate("/");
        },
        onError:(error : Error)=>{
            showToast({message: error.message , type:"ERROR"});
    
        }
    });

    const handleClick = ()=>{
        mutation.mutate();
    }
  return (
    <button
      onClick={handleClick}
      className={`inline-block  border-2 ${wfull && "w-full"} border-black bg-white text-black font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out`}
      >
      Sign out
    </button>
  )
}

export default SignOutButton;