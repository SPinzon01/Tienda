const { Device, Comment } = require("../models");

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los dispositivos" });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [{ model: Comment, as: "comments" }],
    });
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ error: "Dispositivo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el dispositivo" });
  }
};

exports.createDevice = async (req, res) => {
  try {
    const newDevice = await Device.create(req.body);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el dispositivo" });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const deleted = await Device.destroy({ where: { id: deviceId } });
    if (deleted === 0) {
      return res.status(404).json({ error: "Dispositivo no encontrado" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el dispositivo" });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const deviceId = req.params.id;

    const [updated] = await Device.update(req.body, {
      where: { id: deviceId },
    });
    if (updated === 0) {
      return res.status(404).json({ error: "Dispositivo no encontrado" });
    }
    const device = await Device.findByPk(deviceId);
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el dispositivo" });
  }
};
