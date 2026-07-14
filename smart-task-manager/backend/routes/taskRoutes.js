const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");
const validateTask = require("../middleware/validate");

const router = express.Router();

// All task routes are protected
router.use(authMiddleware);

// GET all tasks for the logged-in user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create task for the logged-in user
router.post("/", validateTask, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT update task (only if it belongs to the user)
router.put("/:id", validateTask, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE task (only if it belongs to the user)
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;