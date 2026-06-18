import express from "express";

const router = express.Router();
router.get("/me", userController.getMe);
router.post("/complete-profile", userController.completeProfile);
router.put("/update-profile", userController.updateProfile);

export default router;
