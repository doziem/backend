import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoute from "./routes/products.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", userRoute);

app.listen(port, () => console.log(`App running on Port ${port}`));
