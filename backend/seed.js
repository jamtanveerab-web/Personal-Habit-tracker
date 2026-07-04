// Run with: node seed.js
// Populates the database with a few starter habits (clears existing ones first)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Habit = require("./models/Habit");

const starterHabits = [
  { name: "Wake up at 06:30am", goal: 7, days: [true, true, false, true, true, false, false] },
  { name: "Gym", goal: 5, days: [true, false, true, false, true, false, false] },
  { name: "Reading", goal: 6, days: [true, true, true, false, true, true, false] },
  { name: "Cold Shower", goal: 7, days: [true, true, true, true, false, false, false] },
];

(async () => {
  await connectDB();
  await Habit.deleteMany({});
  await Habit.insertMany(starterHabits);
  console.log("Seeded starter habits.");
  await mongoose.disconnect();
  process.exit(0);
})();
