import express from "express";
import { createSession, getLessonSessions } from "../controllers/sessionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("mentor"), createSession);

router.get("/lesson/:id", authMiddleware, getLessonSessions);

export default router;