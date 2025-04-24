const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const app = express();

// Configuración de middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear directorio uploads si no existe
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rutas
const adminRoutes = require("./routes/adminRoutes");
const jugadoresActivosRoutes = require('./routes/jugadoresActivos');
const estadisticasRoutes = require("./routes/estadisticasRoutes");
const jugadorAspiranteRoutes = require("./routes/jugadorAspiranteRoutes");

app.use("/api/admin", adminRoutes);
app.use('/api/jugadores/activos', jugadoresActivosRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/aspirantes", jugadorAspiranteRoutes);
app.use("/uploads", express.static("uploads"));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Conexión a MongoDB (sin opciones obsoletas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 Conectado a MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("🔴 Error al conectar con MongoDB", err);
    process.exit(1);
  });
