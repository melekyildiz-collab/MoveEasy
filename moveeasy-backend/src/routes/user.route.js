import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);

router.put("/update-profile", authMiddleware, userController.updateProfile);

export default router;