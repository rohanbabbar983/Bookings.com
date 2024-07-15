import { useForm } from "react-hook-form";
import regiLogo from "../assets/regiLogo.png";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api/api-clients';
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type RegisterFormDate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  const queryClient = useQueryClient();
  const location = useLocation();

  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDate>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");

      showToast({ message: "Registration Success !", type: "SUCCESS" });
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex-1 relative h-full flex flex-col justify-center gap-2 items-center p-10">
        <form className="w-full max-w-md" onSubmit={onSubmit}>
          <Link to={"/"} className="text-xl absolute font-bold top-10">Bookings.com</Link>
          <div>
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <p className="mb-6">Welcome! Please enter your details</p>
          </div>

          <div className="flex flex-col md:gap-2 md:flex-row"> 
          <label className="block flex-1 text-gray-700 text-sm font-bold mb-2">
            <input
              placeholder="First Name"
              className="border-b border-gray-400 w-full placeholder:font-medium p-1 focus:outline-none focus:border-b-2 focus:border-black"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </label>
          <label className="block flex-1 text-gray-700 text-sm font-bold mb-2">
            <input
              placeholder="Last Name"
              className="border-b border-gray-400 w-full placeholder:font-medium p-1 focus:outline-none focus:border-b-2 focus:border-black"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </label>
            
          </div> 
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              placeholder="Email"
              type="email"
              className="border-b border-gray-400 w-full placeholder:font-medium p-1 focus:outline-none focus:border-b-2 focus:border-black"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              placeholder="Password"
              type="password"
              className="border-b border-gray-400 w-full placeholder:font-medium p-1 focus:outline-none focus:border-b-2 focus:border-black"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-6">
            <input
              placeholder="Confirm Password"
              type="password"
              className="border-b border-gray-400 w-full placeholder:font-medium p-1 focus:outline-none focus:border-b-2 focus:border-black"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
          </label>
          <button
            type="submit"
            className="text-white w-full bg-[#050708] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-6"
          >
            Create Account
          </button>
          <div className="text-xs text-center">
            Already have an Account?{" "}
            <Link className="underline" to={"/sign-in"}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-1 hidden md:flex items-center justify-center">
        <img src={regiLogo} className="w-full h-full object-fill" alt="Hotel" />
      </div>
    </div>
  );
};

export default Register;
