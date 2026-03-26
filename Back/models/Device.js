const { DataTypes } = require("sequelize");
const sequelize = require("../DB/db");

const Device = sequelize.define("Device", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha_lanzamiento: {
    type: DataTypes.DATEONLY,
  },
  imagen: {
    type: DataTypes.TEXT,
  },
});

module.exports = Device;
