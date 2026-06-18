import express from "express";


const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Demarches route is working!" });
});
router.get("/:id", (req, res) => {
  res.json({ message: "Demarche retrieved successfully" });
});

export default router;