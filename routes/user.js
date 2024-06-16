import express from "express";
import { findAllUser } from "../controller/userController.js";

const router = express.Router();

router.get("/user", findAllUser);

export default router;
