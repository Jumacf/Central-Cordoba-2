// jugadoresActivosController.js

const JugadorActivo = require('../models/JugadorActivo');

const registrarJugadorActivo = async (req, res) => {
  try {
    const datosJugador = req.body;

    // Archivos subidos
    if (req.files['fotoJugador']) {
      datosJugador.fotoJugador = req.files['fotoJugador'][0].path;
    }
    if (req.files['archivoMedico']) {
      datosJugador.archivoMedico = req.files['archivoMedico'][0].path;
    }
    if (req.files['archivoSocial']) {
      datosJugador.archivoSocial = req.files['archivoSocial'][0].path;
    }

    const nuevoJugador = new JugadorActivo(datosJugador);
    await nuevoJugador.save();
    res.status(201).json({ mensaje: 'Jugador registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar jugador activo:', error);
    res.status(500).json({ error: 'Error al registrar jugador' });
  }
};

const buscarJugadoresActivos = async (req, res) => {
  try {
    const filtros = req.query;
    const query = {};

    // Campos filtrables
    const campos = [
      'nombre',
      'apellido',
      'categoria',
      'ciudad',
      'provincia',
      'posicion',
      'genero',
      'pieDominante'
    ];

    campos.forEach((campo) => {
      if (filtros[campo]) {
        query[campo] = new RegExp(filtros[campo], 'i'); // Búsqueda parcial y sin distinción de mayúsculas/minúsculas
      }
    });

    const jugadores = await JugadorActivo.find(query);
    res.status(200).json(jugadores);
  } catch (error) {
    console.error('Error al buscar jugadores activos:', error);
    res.status(500).json({ error: 'Error al buscar jugadores' });
  }
};

module.exports = {
  registrarJugadorActivo,
  buscarJugadoresActivos
};
