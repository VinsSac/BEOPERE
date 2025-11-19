import mongoose from "mongoose";

const operaSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String, default: "" },
  anno: { type: Number },
  available: { type: Boolean, default: true },
  immagine: { type: String, default: "" }, // nome file salvato in /uploads
  orientamento: {
    type: String,
    enum: ["verticale", "quadrata", "orizzontale"],
    default: "verticale",
  },
  collezione: { type: String, default: "Generale" }, // nuova proprietà
  createdAt: { type: Date, default: Date.now },
});

// Qui puoi specificare il nome della collezione in MongoDB se vuoi:
export default mongoose.model("Opera", operaSchema, "opere");
