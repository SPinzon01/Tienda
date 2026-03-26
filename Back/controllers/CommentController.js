const { Comment, User, Device } = require("../models");

exports.createComment = async (req, res) => {
  try {
    const { id_usuario, id_dispositivo, texto } = req.body;

    if (!id_usuario || !id_dispositivo || !texto) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newComment = await Comment.create({
      id_usuario,
      id_dispositivo,
      texto,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al crear comentario:", error);
    res
      .status(500)
      .json({ error: "Error al crear el comentario", details: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nombre", "correo_electronico"],
        },
        { model: Device, as: "device", attributes: ["id", "nombre", "marca"] },
      ],
      order: [["fecha_creacion", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener todos los comentarios:", error);
    res
      .status(500)
      .json({
        error: "Error al obtener los comentarios",
        details: error.message,
      });
  }
};

exports.getCommentsByDeviceId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: { id_dispositivo: id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nombre", "correo_electronico"],
        },
      ],
      order: [["fecha_creacion", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error al obtener comentarios por dispositivo:", error);
    res
      .status(500)
      .json({ error: "Error al obtener comentarios", details: error.message });
  }
};
