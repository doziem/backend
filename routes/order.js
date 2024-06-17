import express from "express";
const router = express.Router();

import { getUserOrders } from "../controller/orderController";

router.get("/:id", getUserOrders);
export default router;
