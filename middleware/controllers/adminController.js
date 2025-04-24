/* Ahora agregamos las funciones para registrar e iniciar sesión como administrador: */

// controllers/adminController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar nuevo administrador
exports.registrarAdmin = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const adminExistente = await Admin.findOne({ email });
    if (adminExistente) {
      return res.status(400).json({ mensaje: "El admin ya existe" });
    }

    const contraseñaHash = await bcrypt.hash(contraseña, 10);

    const nuevoAdmin = new Admin({
      nombre,
      email,
      contraseña: contraseñaHash,
    });

    await nuevoAdmin.save();
    res.status(201).json({ mensaje: "Administrador registrado con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar", error });
  }
};

// Iniciar sesión como administrador
exports.loginAdmin = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    const esValido = await bcrypt.compare(contraseña, admin.contraseña);
    if (!esValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign( 
      { id: admin._id, role: "admin", nombre: admin.nombre }, // esto debe coindicir con App.js
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, nombre: admin.nombre });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};
