import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app=express()
const port=process.env.PORT;
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("port rumming")
})

app.listen(port,()=>{
    console.log(`running on ${port}`)
})
