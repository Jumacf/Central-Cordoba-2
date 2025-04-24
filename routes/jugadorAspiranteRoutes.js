// jugadorAspiranteRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
    registrarAspirante,
    obtenerAspirantes,
    buscarAspirantesPorFiltro
} = require("../controllers/jugadorAspiranteController");

// registar aspirantes con foto
router.post("/", upload.single("foto"), registrarAspirante); // Usamos uploadMiddleware
// obtener todos los aspirantes
router.get("/", obtenerAspirantes);
// buscar filtros
router.get("/buscar", buscarAspirantesPorFiltro);

module.exports = router;
