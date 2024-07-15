import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
}

const BookingDetailSummary = ({checkIn , checkOut , adultCount , childCount , hotel , numberOfNights}: Props) => {
    return(
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 ">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2">
                Hotel:
                <div className="font-bold">{hotel.name}</div>
            </div>
            <div className="border-b py-2">
                Location:
                <div className="font-bold">{`${hotel.city} , ${hotel.country}`}</div>
            </div>
            <div className=" border-b flex gap-10">
            <div className="py-2">
                Check-in:
                <div className="font-bold">{checkIn.toDateString()}</div>
            </div>
            <div className="py-2">
                Check-out:
                <div className="font-bold">{checkOut.toDateString()}</div>
            </div>

            </div>
            <div className="border-b py-2">
                Total stay:
                <div className="font-bold">{numberOfNights} nights</div>
            </div>
            <div className=" py-2">
                Guests:
                <div className="font-bold">{`${adultCount} adults & ${childCount} children`}</div>
            </div>

        </div>
    )
  
}

export default BookingDetailSummary;