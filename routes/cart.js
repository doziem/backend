import express from "express";
const router = express.Router();

import {
  addToCart,
  decrementCartItem,
  deleteCartItem,
  getCart,
} from "../controller/cartController.js";

router.get("/find", getCart);
router.post("/", addToCart);
router.post("/quantity", decrementCartItem);
router.delete("/:cartItemId", deleteCartItem);

export default router;
