import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import proxyRoutes from "./routes/proxy";
import logRoutes from "./routes/logs";
import authRoutes from "./routes/auth";
import helmet from "helmet";

dotenv.config();

const app = express();
  app.use(cors({
    origin: ["http://localhost:5173", "https://proxy-logger-tau.vercel.app/", process.env.CLIENT_URL!],
    credentials: true,
  }));

app.use(express.json());
app.use(helmet());

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/test", (req, res) => {
    res.json({ message: "Hello from backend!" });
});
app.use("/api/proxy", proxyRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);

export default app;
