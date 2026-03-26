const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/DeviceController");

router.get("/", deviceController.getAllDevices);
router.get("/:id", deviceController.getDeviceById);
router.post("/", deviceController.createDevice);
router.delete("/:id", deviceController.deleteDevice);
router.put("/:id", deviceController.updateDevice);

module.exports = router;
