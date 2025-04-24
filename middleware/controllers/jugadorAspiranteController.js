// jugadorAspirantController.js

const JugadorAspirante = require("../models/JugadorAspirante");

// ✅ Registrar nuevo aspirante
exports.registrarAspirante = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      edad,
      clase,
      categoria,
      posicion,
      situacion,
      clubAnterior,
      altura,
      peso,
      pieDominante,
      nivelEstudios,
      infoMedica,
      observaciones,
      ciudad,
      provincia,
      sexo,
    } = req.body;

    const foto = req.file ? `/uploads/${req.file.filename}` : null; // ruta completa del archivo

    const nuevoJugador = new JugadorAspirante({
      nombre,
      apellido,
      edad,
      clase,
      categoria,
      posicion,
      situacion,
      clubAnterior,
      altura,
      peso,
      pieDominante,
      nivelEstudios,
      infoMedica,
      observaciones,
      ciudad,
      provincia,
      sexo,
      foto,
    });

    await nuevoJugador.save();
    res.status(201).json({ mensaje: "Jugador aspirante registrado con éxito", jugador: nuevoJugador });
  } catch (error) {
    console.error("Error al registrar jugador aspirante:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

// ✅ Obtener todos los aspirantes
exports.obtenerAspirantes = async (req, res) => {
  try {
    const aspirantes = await JugadorAspirante.find();
    res.status(200).json(aspirantes);
  } catch (error) {
    console.error("Error al obtener aspirantes:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

// ✅ Buscar aspirantes por filtros (búsqueda parcial y flexible)
exports.buscarAspirantesPorFiltro = async (req, res) => {
  try {
    const filtros = {};

    const campos = [
      "nombre",
      "apellido",
      "ciudad",
      "provincia",
      "posicion",
      "sexo",
      "pieDominante",
    ];

    campos.forEach((campo) => {
      if (req.query[campo]) {
        filtros[campo] = { $regex: new RegExp(req.query[campo], "i") }; // búsqueda parcial e insensible a mayúsculas
      }
    });

    const aspirantes = await JugadorAspirante.find(filtros);
    res.status(200).json(aspirantes);
  } catch (error) {
    console.error("Error al buscar aspirantes:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};
