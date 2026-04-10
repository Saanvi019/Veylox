import express from "express";
import { addKey } from "../controllers/keyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getKeysByProject } from "../controllers/keyController.js";
import { getFullKey } from "../controllers/keyController.js";
import { deleteKey } from "../controllers/keyController.js";
import { getAllKeys } from "../controllers/keyController.js";


const router = express.Router();

router.post("/", authMiddleware, addKey);
router.get("/:projectId", authMiddleware, getKeysByProject);
router.get("/single/:keyId", authMiddleware, getFullKey);
router.delete("/:keyId", authMiddleware, deleteKey);
router.get("/user/all", authMiddleware, getAllKeys);

export default router;