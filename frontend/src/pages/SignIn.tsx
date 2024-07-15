import { useForm } from "react-hook-form";
import regiLogo from "../assets/regiLogo.png";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-clients";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  const queryClient = useQueryClient();
  const location = useLocation();

  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");

      showToast({ message: "Login Success !", type: "SUCCESS" });
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
    <div className="flex w-full h-screen">
      <div className="flex-1 relative h-full flex flex-col justify-center gap-2 items-center p-10">
        <form className="w-full max-w-md" onSubmit={onSubmit}>
          <Link to={"/"} className="text-xl absolute font-bold top-10">Bookings.com</Link>
          <h2 className="text-3xl font-bold">Sign in</h2>
          <p className="mb-6">Welcome Back! Please enter your details</p>

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
          <label className="block text-gray-700 text-sm font-bold mb-6">
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
          <div className="flex justify-between flex-col md:flex-row gap-5 items-center mb-6">
            <button
              type="submit"
              className="text-white w-full bg-[#050708] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-xs">
              Not Registered?{" "}
              <Link className="underline" to={"/register"}>
                Create an account here
              </Link>
        </div>
      </div>
      <div className="flex-1 hidden md:flex items-center justify-center">
        <img src={regiLogo} className="w-full h-full object-fill" alt="Hotel" />
      </div>
    </div>
  );
};

export default SignIn;
