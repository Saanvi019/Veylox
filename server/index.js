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

const app = express();
const port = process.env.PORT;

// ✅ CORS FIRST
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:3000", "https://veylox.vercel.app"],
    credentials: true,
  })
);

// ✅ Helmet
app.use(helmet());

// ✅ VERY IMPORTANT → parse JSON BEFORE using req.body
app.use(express.json());

// ✅ SAFE sanitization (after body exists)
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);

    const sanitizeString = (str) => str.replace(/<.*?>/g, "");

    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }
  next();
});

// ✅ Rate limiter
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