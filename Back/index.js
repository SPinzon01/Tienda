const express = require("express");
const { sequelize } = require("./models");
const deviceRoutes = require("./routes/Devices");
const userRoutes = require("./routes/Users");
const commentRoutes = require("./routes/Comments");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

// Registro de peticiones para depuración
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.use("/api/devices", deviceRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/comentarios", commentRoutes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada ✅");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("Error al sincronizar la base de datos:", err));
