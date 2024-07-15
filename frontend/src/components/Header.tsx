import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import MobileNav from "./MobileNav";

const Header = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <div className="mix-blend-normal shadow-md py-6">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-black font-bold tracking-tight">
                <Link to={"/"}>Bookings.com</Link>
            </span>
            <div className="md:hidden">
                <MobileNav/>
            </div>
            <div className="hidden md:block">
            <span className="flex items-center gap-4 justify-evenly space-x-2">
                {isLoggedIn ? (<>
                  <Link to="/my-bookings">My Bookings</Link>
                  <Link to="/my-hotels">My Hotels</Link>
                  <SignOutButton />
                </>):(
                          <Link
                          to="/sign-in"
                          className="inline-block  border-2 border-black hover:bg-white hover:text-black font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
                        >
                          Sign in
                        </Link>
                )               
                }  
            </span>
            </div>
           
        </div>

    </div>
  )
}

export default Header;