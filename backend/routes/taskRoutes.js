const express = require("express");
const router = express.Router(); // ✅ correct

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/stats", getTaskStats);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
