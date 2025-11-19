import express from "express";
import Opera from "../models/Opera.js";
import multer from "multer";

const router = express.Router();

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CREATE
router.post("/", upload.single("immagine"), async (req, res) => {
  try {
    const nuovaOpera = new Opera({
      titolo: req.body.titolo,
      descrizione: req.body.descrizione,
      anno: req.body.anno,
      available: req.body.available === "true", // 🔥 FIX
      immagine: req.file ? req.file.filename : "",
    });

    const salvata = await nuovaOpera.save();
    res.json({ message: "Opera aggiunta", opera: salvata });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET tutte le opere
router.get("/", async (req, res) => {
  try {
    const opere = await Opera.find().sort({ dataCreazione: -1 });
    res.json(opere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE opera
router.delete("/:id", async (req, res) => {
  try {
    await Opera.findByIdAndDelete(req.params.id);
    res.json({ message: "Opera eliminata" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
