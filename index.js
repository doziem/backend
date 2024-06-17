import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

import productRoute from "./routes/products.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";

const port = process.env.PORT || 5000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB Connected!"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => console.log(`App running on Port ${port}`));
