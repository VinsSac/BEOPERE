import mongoose from "mongoose";

const operaSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String, default: "" },
  anno: { type: Number },
  available: { type: Boolean, default: true },
  immagine: { type: String, default: "" }, // nome file salvato in /uploads
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Opera", operaSchema);
