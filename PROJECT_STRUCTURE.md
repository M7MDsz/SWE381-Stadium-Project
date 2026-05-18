# Project Structure

This repository contains a complete SWE381-style full-stack stadium reservation application.

## Root

- `README.md` - setup instructions, features, and API summary.
- `package.json` - root scripts for installing and running the frontend and backend.
- `backend/` - Node.js, Express.js, MongoDB, Mongoose, JWT, and bcrypt API.
- `frontend/` - React, React Router, Context API, Bootstrap, HTML, and CSS client.
- `Refs/` - SWE381 course slides used as the style reference.

## Backend

```text
backend/
├── config/db.js
├── controllers/authController.js
├── controllers/messageController.js
├── controllers/reservationController.js
├── controllers/stadiumController.js
├── middleware/authMiddleware.js
├── middleware/errorMiddleware.js
├── middleware/loggerMiddleware.js
├── middleware/validateMiddleware.js
├── models/Message.js
├── models/Reservation.js
├── models/Stadium.js
├── models/User.js
├── routes/authRoutes.js
├── routes/messageRoutes.js
├── routes/reservationRoutes.js
├── routes/stadiumRoutes.js
├── app.js
├── server.js
├── package.json
└── .env.example
```

## Frontend

```text
frontend/
├── public/README.md
├── index.html
├── package.json
└── src/
    ├── components/NavBar.jsx
    ├── components/ProtectedRoute.jsx
    ├── components/SlotBadge.jsx
    ├── components/StadiumCard.jsx
    ├── context/AuthContext.jsx
    ├── pages/AddStadium.jsx
    ├── pages/Dashboard.jsx
    ├── pages/Home.jsx
    ├── pages/Login.jsx
    ├── pages/Messages.jsx
    ├── pages/MyReservations.jsx
    ├── pages/NotFound.jsx
    ├── pages/OwnerStats.jsx
    ├── pages/Register.jsx
    ├── pages/Search.jsx
    ├── pages/StadiumDetails.jsx
    ├── services/api.js
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```
