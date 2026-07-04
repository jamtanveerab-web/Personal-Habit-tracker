import axios from "axios";

// In dev, Vite proxies "/api" to http://localhost:5000 (see vite.config.js).
// In production, set VITE_API_URL (e.g. https://your-backend.onrender.com/api)
// as an environment variable on your frontend host.
const API_ROOT = import.meta.env.VITE_API_URL || "/api";
const API_BASE = `${API_ROOT}/habits`;

export const getHabits = () => axios.get(API_BASE).then((res) => res.data);

export const createHabit = (name, goal) =>
  axios.post(API_BASE, { name, goal }).then((res) => res.data);

export const toggleDay = (id, dayIndex) =>
  axios.patch(`${API_BASE}/${id}/toggle`, { dayIndex }).then((res) => res.data);

export const updateGoal = (id, goal) =>
  axios.patch(`${API_BASE}/${id}`, { goal }).then((res) => res.data);

export const deleteHabit = (id) =>
  axios.delete(`${API_BASE}/${id}`).then((res) => res.data);
