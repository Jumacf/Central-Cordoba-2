/* Creamos el esquema para los jugadores activos. Este modelo va a representar a cada jugador cargado desde el panel. */


//JugadorActivo.js
const mongoose = require('mongoose');

const jugadorActivoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
  edad: Number,
  categoria: String,
  ciudad: String,
  provincia: String,
  barrio: String,
  direccion: String,
  nacionalidad: String,
  celularJugador: String,
  mayorEdad: String,
  genero: String,
  pieDominante: String,
  nombreTutor: String,
  apellidoTutor: String,
  celularTutor: String,
  partidosJugados: Number,
  goles: Number,
  asistencias: Number,
  amarillas: Number,
  rojas: Number,
  posicion: String,
  situacionMedica: String,
  situacionSocial: String,
  fotoJugador: String,
  archivoMedico: String,
  archivoSocial: String,
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JugadorActivo', jugadorActivoSchema);
