import { Router } from "express";
import { createProduct } from "../controller/productController.js";

const router = Router();
//Product Route
router.post("/", createProduct);

export default router;
