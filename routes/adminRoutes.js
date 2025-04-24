/* Conectamos los controladores con las rutas: */
// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { registrarAdmin, loginAdmin } = require("../controllers/adminController");

// POST /api/admin/registro
router.post("/registro", registrarAdmin);

// POST /api/admin/login
router.post("/login", loginAdmin);// esto esta bien.registra la ruta del post

module.exports = router;
