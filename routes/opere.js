// routes/opere.js
import express from "express";
import Opera from "../models/Opera.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const router = express.Router();

// ------------------------
// CONFIG CLOUDINARY
// ------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------------
// STORAGE MULTER-CLOUDINARY
// ------------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "opere",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ------------------------
// CREATE OPERA
// ------------------------
router.post("/", upload.single("immagine"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nessun file caricato" });
    }

    const nuovaOpera = new Opera({
      titolo: req.body.titolo,
      descrizione: req.body.descrizione,
      anno: req.body.anno,
      available: req.body.available === "true",
      immagine: req.file.path || req.file.url, // sicurezza se cambia versione multer-storage-cloudinary
      orientamento: req.body.orientamento,
      collezione: req.body.collezione || "Generale",
    });

    const salvata = await nuovaOpera.save();
    res.json({ message: "Opera aggiunta", opera: salvata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------
// GET tutte le opere
// ------------------------
router.get("/", async (req, res) => {
  try {
    const opere = await Opera.find().sort({ createdAt: -1 });
    res.json(opere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------
// DELETE opera
// ------------------------
router.delete("/:id", async (req, res) => {
  try {
    await Opera.findByIdAndDelete(req.params.id);
    res.json({ message: "Opera eliminata" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
