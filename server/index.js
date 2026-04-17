import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import keyRoutes from "./routes/keyRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { startReminderJob } from "./cron/reminderJob.js";

dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 500, 
  message: "Too many requests, please try again later",
});

const app=express()
const port=process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(xss());           
app.use(limiter);

app.use("/api/auth",authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/keys", keyRoutes);

app.get('/',(req,res)=>{
    res.send("port rumming")
})

app.listen(port,()=>{
    console.log(`running on ${port}`)
})
startReminderJob();