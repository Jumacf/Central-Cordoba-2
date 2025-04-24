/* Este archivo define cómo será un administrador en tu base de datos:*/
// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
