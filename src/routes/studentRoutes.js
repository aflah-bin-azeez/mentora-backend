import express from "express";
import { createStudent, getStudents } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole("parent"), createStudent);
router.get("/", authMiddleware, checkRole("parent"), getStudents);

export default router;