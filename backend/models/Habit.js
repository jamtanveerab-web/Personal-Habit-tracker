const mongoose = require("mongoose");

// days[0..6] maps to Mon..Sun
const HabitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
      maxlength: 80,
    },
    goal: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
      default: 7,
    },
    days: {
      type: [Boolean],
      default: () => Array(7).fill(false),
      validate: {
        validator: (arr) => arr.length === 7,
        message: "days array must have exactly 7 entries (Mon-Sun)",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", HabitSchema);
