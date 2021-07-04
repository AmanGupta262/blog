import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({msg: "hello world"})
})

// Create server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on Port ", PORT);
});
