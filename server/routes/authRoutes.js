import express from "express";
import {
  signUp,
  login,
  oauthCallback,
  logout,
} from "../controllers/authController.js";
import { getCurrentUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);

router.post("/signup", signUp);
router.post("/login", login);
router.post("/oauth-callback", oauthCallback);
router.post("/logout", authMiddleware, logout);

export default router;
