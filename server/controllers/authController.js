
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const signUp= async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).res.json({message:"email already in use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const user= await User.create({
            name,
            email,
            password:hashedPassword,
        })

        res.status(201).json({
            message:"user created successfully",
            userId:user._id,
        })
    } catch (error) {
        res.status(500).json({
            message:"signup failed",
            error:error.message,
        })
    }
}

export const login= async (req,res)=>{
    try {
        const {email, password}=req.body;

        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({message:"invalid credentials"});
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(200).json({
            message:"login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });

        
    } catch (error) {
        res.status(500).json({
            message:"login failed",
            error:error.message
        })
    }
}

