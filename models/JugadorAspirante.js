// models/jugadorAspirante.js
const mongoose = require("mongoose");

const jugadorAspiranteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: Number,
  clase: Number,
  categoria: String,
  posicion: String,
  situacion: String,
  clubAnterior: String,
  altura: Number,
  peso: Number,
  pieDominante: String,
  nivelEstudios: String,
  infoMedica: String,
  observaciones: String,
  ciudad: String,
  provincia: String,
  sexo: String,
  foto: String, // ruta del archivo completa
}, { timestamps: true });

module.exports = mongoose.model("JugadorAspirante", jugadorAspiranteSchema);

