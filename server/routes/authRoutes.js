import express from "express"
import { signUp ,login } from "../controllers/authController.js"
import { getCurrentUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router =express.Router();

router.get("/me", authMiddleware, getCurrentUser);

router.post("/signup", signUp);
router.post("/login",login);

export default router;