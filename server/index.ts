import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "./config/mongoose";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", routes.authRouter);
app.use("/api/v1/user", routes.authRouter);

// Create server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on Port ", PORT);
});
