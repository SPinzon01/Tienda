const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

router.post("/", commentController.createComment);
router.get("/:id", commentController.getCommentsByDeviceId);
router.get("/", commentController.getAllComments);

module.exports = router;
