const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { correo_electronico, password } = req.body;
    const user = await User.findOne({ where: { correo_electronico } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const esValida = await user.validarContrasena(password);
    if (!esValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    res.status(200).json({
      message: "Login exitoso ✅",
      usuario: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo_electronico,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
