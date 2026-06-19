import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "http://l9milcv3y5nz53h0zgxdr9d6.194.163.153.147.sslip.io"
],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});