import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoute from "./routes/productRoute.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/v1/product", productRoute);

app.listen(process.env.PORT, () => console.log(`App running on Port ${port}`));
