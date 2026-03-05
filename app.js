import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/books", bookRoutes);

// errorHandler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
