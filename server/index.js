import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

const app=express()
const port=process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

app.get('/',(req,res)=>{
    res.send("port rumming")
})

app.listen(port,()=>{
    console.log(`running on ${port}`)
})
