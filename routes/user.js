import express from "express";
const router = express.Router();
import {
  findAllUser,
  deleteUser,
  findOneUser,
} from "../controller/userController.js";

router.delete("/:id", deleteUser);
router.get("/find/:id", findOneUser);
router.get("/all", findAllUser);

export default router;
