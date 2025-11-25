import "dotenv/config"; // carica .env
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import opereRoutes from "./routes/opere.js";

const __filename = fileURLToPath(import.meta.url);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
