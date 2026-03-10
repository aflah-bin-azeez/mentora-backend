import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import llmRoutes from "./routes/llmRoutes.js";

const app = express();
dotenv.config();


connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Mentora Backend API running");
});


app.use("/auth", authRoutes);

app.use("/llm", llmRoutes);
app.use("/sessions", sessionRoutes);
app.use("/bookings", bookingRoutes);
app.use("/lessons", lessonRoutes);
app.use("/students", studentRoutes);


export default app;