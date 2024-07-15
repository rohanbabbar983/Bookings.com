import { useQuery } from "react-query";
import * as apiClient from "../api/api-clients";
import HomePageCards from "../components/HomePageCards";
import AppImg from "../assets/appDownload.png";
import Landing from "../assets/landing2.png";
import FAQSection from "../components/FAQSection";

const HomePage = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const mayLike: string[] = JSON.parse(
    sessionStorage.getItem("mayLike") || "[]"
  );


  const { data: mayLikeHotel } = useQuery(["mayLikeQuery", mayLike], () =>
    apiClient.mayLike(mayLike)
  );
  
  return (
    <div className="flex w-full py-5 flex-col">
      <div>
        <h2 className="text-3xl font-bold">Latest Destinations</h2>
        <p>Most recent destinations added by our hosts</p>
        <div className="flex flex-row flex-nowrap w-full overflow-x-scroll scrollbar-hide  py-4 gap-3">
          {hotels?.slice(0,7).map((hotel) => (
            <HomePageCards key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
      <div className="min-h-[40vh]">
        <h2 className="text-3xl font-bold">Popular Searches</h2>
        <p>Based on your recent searches and choices</p>

        <div className="flex flex-row flex-nowrap w-full overflow-x-scroll scrollbar-hide  py-4 gap-3">
          {mayLikeHotel?.slice(0,7).map((hotel) => (
            <HomePageCards key={hotel._id} hotel={hotel} />
          ))}
          
        </div>
      </div>
      <h2 className="text-3xl font-bold">Download App</h2>
        <p>We got our own dedicated mobile app.</p>
      <div className="grid mt-5 p-4 bg-[#F9F9F9] md:grid-cols-2 gap-2">
        <img src={Landing} alt="Hotel Booking" />
        <div className="flex flex-col  items-center justify-center gap-4 text-center">
          <span className="font-bold text-4xl tracking-tighter">
            Book Your Perfect Stay Instantly!
          </span>
          <span>
            Download the Bookings.com app for quicker bookings and tailored
            recommendations for your next getaway.
          </span>
          <img src={AppImg} alt="Download App" />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-bold">Popular Queries</h2>
        <p>Frequently asked questions from our users</p>
        <FAQSection/>
      </div>
    </div>
  );
};

export default HomePage;
