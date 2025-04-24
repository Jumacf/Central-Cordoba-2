//jugadoresActivos.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  registrarJugadorActivo,
  buscarJugadoresActivos
} = require('../controllers/jugadoresActivosController');

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegurate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Registrar jugador activo
router.post(
  '/activos/registrar',
  upload.fields([
    { name: 'fotoJugador', maxCount: 1 },
    { name: 'archivoMedico', maxCount: 1 },
    { name: 'archivoSocial', maxCount: 1 }
  ]),
  registrarJugadorActivo
);

// Buscar jugadores activos con filtros
router.get('/activos/buscar', buscarJugadoresActivos);

module.exports = router;
