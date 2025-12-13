const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  getTaskStats,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/stats", getTaskStats);
router.patch("/:id", updateTask);

module.exports = router;
