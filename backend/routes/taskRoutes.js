const express = require("express");
const router = express.Router(); // ✅ correct

const {
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);

module.exports = router;
