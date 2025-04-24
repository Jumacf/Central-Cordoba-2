/*Este archivo verifica el token JWT que se envía en los headers de cada petición: */

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Acceso denegado. Token faltante o inválido." });
  }

  try {
    const tokenReal = token.split(" ")[1]; // Eliminar el "Bearer"
    const verificado = jwt.verify(tokenReal, process.env.JWT_SECRET);
    req.usuario = verificado; // Guarda info del token para usar después (como req.usuario.role)
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado." });
  }
};

module.exports = verificarToken;
