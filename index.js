import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
dotenv.config({});
const app = express();

connectDB();






app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

  app.use("/api/user",userRoute);
  app.use("/api/company",companyRoute);
  app.use("/api/job",jobRoute);
  app.use("/api/application",applicationRoute);


app.listen(PORT, () => {
   
  console.log(`Server is running on port ${PORT}`);
});