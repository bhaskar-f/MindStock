import express from "express";
import {
  createIdea,
  getIdea,
  updateIdea,
} from "../controllers/idea.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIdea);
router.get("/", authMiddleware, getIdea);
router.put("/:id", authMiddleware, updateIdea);

export default router;
