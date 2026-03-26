const sequelize = require("../DB/db");
const User = require("./User");
const Device = require("./Device");
const Comment = require("./Comment");

User.hasMany(Comment, {
  foreignKey: "id_usuario",
  as: "comments",
});

Device.hasMany(Comment, {
  foreignKey: "id_dispositivo",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "id_usuario",
  as: "user",
});

Comment.belongsTo(Device, {
  foreignKey: "id_dispositivo",
  as: "device",
});

module.exports = {
  sequelize,
  User,
  Device,
  Comment,
};
