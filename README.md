# SWE381 Stadium Reservation Project

A simple full-stack web application for organizing soccer matches using the SWE381 lecture-style structure.

## Folder Structure

```text
SWE381-Stadium-Project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    └── package.json
```

## Repository Contents

The app source code is committed in this repository under `backend/` and `frontend/`. See `PROJECT_STRUCTURE.md` for a file-by-file overview.

## Technology Used

- HTML, CSS, React, React Router, Context API, Bootstrap
- Node.js, Express.js, MongoDB, Mongoose
- JWT authentication with Bearer tokens
- bcrypt password hashing

## Main Features

### Stadium Owner

- Register, login, and logout
- Add stadium details, location, photo URLs, and facilities
- Add available reservation slots
- View red reserved slots and green available slots
- Send and receive messages
- View reservation statistics

### Match Organizer

- Register, login, and logout
- Search stadiums by location, date, and time
- View availability schedules
- Reserve an available slot
- Cancel an active reservation
- Send and receive messages

## Verify the Work Is in the Repo

Run this command from the repository root to verify the backend and frontend application files are present:

```bash
npm run verify
```

Run this command to check backend JavaScript syntax:

```bash
npm run check:backend
```

## Run Locally

1. Create a backend environment file:

```bash
cp backend/.env.example backend/.env
```

2. Make sure MongoDB is running locally or update `MONGO_URI` in `backend/.env`.

3. Install all dependencies from the project root:

```bash
npm install
```

4. Start frontend and backend together:

```bash
npm run dev
```

This command starts both apps at the same time. Backend API runs on `http://localhost:5000` and frontend runs on the Vite URL shown in the terminal, usually `http://localhost:5173`.

If only the backend starts on your computer, use two terminals instead:

Terminal 1:

```bash
npm run dev:backend
```

Terminal 2:

```bash
npm run dev:frontend
```

## Fix Broken package.json on Windows

If npm or Vite says `EJSONPARSE`, `Failed to load PostCSS config`, or `Expected double-quoted property name in JSON`, repair the package files from the project root:

```powershell
node scripts\repair-package-json.js
npm install
npm run dev
```

## If the Frontend Is a White Page

Do not open `frontend/index.html` directly. Start the app with Vite from the project root:

```bash
npm install
npm run dev
```

Then open the frontend URL printed in the terminal, usually `http://localhost:5173`. If the page is still blank, see `frontend/TROUBLESHOOTING.md`.

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/stadiums`
- `GET /api/stadiums/:id`
- `POST /api/stadiums` owner only
- `POST /api/stadiums/:id/slots` owner only
- `POST /api/stadiums/:stadiumId/slots/:slotId/reserve` signed-in users
- `GET /api/reservations/mine`
- `PUT /api/reservations/:id/cancel`
- `GET /api/messages`
- `POST /api/messages`
