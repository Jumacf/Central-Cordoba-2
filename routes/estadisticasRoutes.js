const express = require("express");
const router = express.Router();
const { obtenerEstadisticas } = require("../controllers/estadisticasController");
const verificarToken = require("../middleware/authMiddleware");

router.get("/", verificarToken, obtenerEstadisticas);

module.exports = router;
