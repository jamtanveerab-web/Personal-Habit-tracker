const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// GET /api/habits — list all habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: 1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/habits — create a habit
router.post("/", async (req, res) => {
  try {
    const { name, goal } = req.body;
    const habit = new Habit({
      name,
      goal: goal || 7,
      days: Array(7).fill(false),
    });
    const saved = await habit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/habits/:id/toggle — flip a single day checkbox
router.patch("/:id/toggle", async (req, res) => {
  try {
    const { dayIndex } = req.body;
    if (dayIndex < 0 || dayIndex > 6) {
      return res.status(400).json({ message: "dayIndex must be 0-6" });
    }
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    habit.days[dayIndex] = !habit.days[dayIndex];
    habit.markModified("days");
    const updated = await habit.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/habits/:id — update name/goal
router.patch("/:id", async (req, res) => {
  try {
    const { name, goal } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (goal !== undefined) update.goal = Math.max(1, Math.min(7, Number(goal)));

    const updated = await Habit.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Habit not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/habits/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Habit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
