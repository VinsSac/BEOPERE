import "dotenv/config"; // carica .env
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import opereRoutes from "./routes/opere.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/opere", opereRoutes);

// Connessione MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => {
    console.error("Errore connessione MongoDB:", err.message);
    process.exit(1);
  });

// Avvio server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server online su porta ${PORT}`);
});
