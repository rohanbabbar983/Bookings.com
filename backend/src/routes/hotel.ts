import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/maylike", async (req: Request, res: Response) => {
  const mayLikeData: string[] = req.body;
  try {
    // Create an array of regex patterns for each city in mayLikeData
    const regexPatterns = mayLikeData.map((city) => new RegExp(city, "i"));

    // Use the regex patterns in the query
    const mayLikeHotels = await Hotel.aggregate([
      { $match: { city: { $in: regexPatterns } } },
    ]);
    // Extract the IDs of the hotels fetched in the first query
    const mayLikeHotelIds = mayLikeHotels.map((hotel) => hotel._id);

    // Second query: fetch hotels not in the mayLikeHotels
    const otherHotels = await Hotel.aggregate([
      { $match: { _id: { $nin: mayLikeHotelIds } } },
      { $sample: { size: 10 } }, // Adjust size as needed
    ]);

    // Concatenate the mayLikeHotels with otherHotels
    const allHotels = [...mayLikeHotels, ...otherHotels];

    res.status(200).json(allHotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      metadata: {
        hotelId,
        userId: req.userId,
        totalCost: totalCost.toString(), // Add totalCost to metadata
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { paymentIntentId } = req.body;

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "Payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const totalCost = parseFloat(paymentIntent.metadata.totalCost);

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
        totalCost, // Ensure totalCost is stored in the booking
      };

      const hotel = await Hotel.findById(req.params.hotelId);

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      hotel.bookings.push(newBooking);

      await hotel.save();

      return res.status(200).json({ message: "Booking Saved!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;
