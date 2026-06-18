import express from "express";


const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Aides route is working!" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "Aide retrieved successfully" });
});

export default router;