import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router();
router.get("/:id" , protectRoute, getMessage)
router.post("/send/:id" , protectRoute, sendMessage)
export  default router;