import express, { Request, Response } from "express";
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import myHotelsRoute from "./routes/my-hotels";
import hotelRoute from "./routes/hotel";
import bookingRoutes from "./routes/my-bookings";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!", process.env.MONGODB_CONNECTION_STRING));



const app= express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true,
}));
app.use(express.static(path.join(__dirname , "../../frontend/dist")));



app.use("/api/auth", authRoutes)
app.use("/api/users",userRoutes);
app.use("/api/my-hotels",myHotelsRoute);
app.use("/api/hotels",hotelRoute);
app.use("/api/my-bookings",bookingRoutes)
app.get("/api/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
app.listen(7000,()=>{
    console.log("server started at localhost:7000");
})
