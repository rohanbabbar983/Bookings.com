import React, { useContext, useState } from "react";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || "Delhi"
  );

  const today = new Date();
  const [checkIn, setCheckIn] = useState<Date>(() => {
    const storedCheckIn = sessionStorage.getItem("checkIn");
    if (storedCheckIn && new Date(storedCheckIn) >= today) {
      return new Date(storedCheckIn);
    } else {
      return new Date();
    }
  });
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(
        sessionStorage.getItem("checkOut") ||
          new Date().setDate(checkIn.getDate() + 1)
      )
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "1")
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelID") || ""
  );

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }

    const mayLike = JSON.parse(sessionStorage.getItem("mayLike") || "[]");

    if (!mayLike.includes(destination)) {
      if (mayLike.length >= 2) {
        mayLike.shift(); // Remove the oldest entry
      }
      mayLike.push(destination);
      sessionStorage.setItem("mayLike", JSON.stringify(mayLike));
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
