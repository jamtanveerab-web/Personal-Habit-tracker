# Discipline — MERN Habit Dashboard

A full-stack habit tracker: Express + MongoDB API on the backend, React (Vite) on the frontend.

```
habit-dashboard-mern/
├── backend/          Express API + Mongoose models
│   ├── config/db.js
│   ├── models/Habit.js
│   ├── routes/habits.js
│   ├── server.js
│   ├── seed.js        (optional: adds 4 starter habits)
│   └── .env.example
└── frontend/         React app (Vite)
    └── src/
        ├── App.jsx
        ├── api/habits.js
        └── components/
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either:
  - Install MongoDB locally (https://www.mongodb.com/try/download/community), or
  - Use a free MongoDB Atlas cluster (https://www.mongodb.com/cloud/atlas) and copy its connection string

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set `MONGO_URI` to your database:

```
MONGO_URI=mongodb://127.0.0.1:27017/habit-dashboard
PORT=5000
```

(If using Atlas, paste the connection string Atlas gives you instead.)

Start the API:

```bash
npm run dev
```

You should see `Server running on port 5000` and `MongoDB connected: ...`.

Optional — seed a few starter habits so the dashboard isn't empty:

```bash
node seed.js
```

## 3. Frontend setup

In a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Vite will print a local URL, typically:

```
http://localhost:5173
```

Open that in your browser. The frontend automatically proxies `/api` requests to the backend on port 5000 (configured in `vite.config.js`), so both servers need to be running at the same time.

## 4. What each piece does

- **Habit Management** — add a habit with a weekly goal (1–7 days), click the LED-style boxes to mark a day complete, edit the goal inline, or remove a habit.
- **Daily Progress** — bar chart showing what % of all habits were completed on each day of the week.
- **Analysis table** — Habit Name, Goal, Actual, Progress % for every habit, calculated live from the data in MongoDB.
- **Overall Stats** — average completion % across all habits, today's consistency, and your strongest habit.

All changes save immediately to MongoDB via the API — refreshing the page won't lose your data.

## 5. Deploying so it works on any device (phone, laptop, tablet)

Short version: MongoDB Atlas (free) for the database, Render (free) for the
backend, and Vercel or Netlify (free) for the frontend. Once deployed you'll
have a single `https://` link that works anywhere with internet, on any
device, with everyone's data synced through the shared database.

## 6. Building for production

```bash
cd frontend
npm run build
```

This outputs static files to `frontend/dist/`, which you can serve with any static host (or have the Express server serve them directly by adding `express.static`).
