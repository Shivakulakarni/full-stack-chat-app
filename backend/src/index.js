import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? [process.env.RENDER_EXTERNAL_URL, "https://full-stack-chat-app-54sl.onrender.com"]
      : ["http://localhost:5173", "http://localhost:5175", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const frontendPath = path.join(__dirname, "../../frontend/dist");
console.log("Frontend path:", frontendPath);

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
