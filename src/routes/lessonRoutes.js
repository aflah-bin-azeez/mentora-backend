import express from "express";
import { createLesson } from "../controllers/lessonController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("mentor"), createLesson);

export default router;