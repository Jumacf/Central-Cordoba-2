// estadisticasController.js

const Jugador = require("../models/JugadorActivo");

const obtenerEstadisticas = async (req, res) => {
  try {
    // Jugadores por ciudad
    const porCiudad = await Jugador.aggregate([
      { $group: { _id: "$ciudad", cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } }
    ]);

    // Jugadores por provincia
    const porProvincia = await Jugador.aggregate([
      { $group: { _id: "$provincia", cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } }
    ]);

    res.json({ porCiudad, porProvincia });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener estadísticas", error });
  }
};

module.exports = { obtenerEstadisticas };
