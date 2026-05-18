# Where Is the Work?

The full-stack SWE381 stadium reservation application is committed in this repository on the current `work` branch.

If you only see the `Refs/` folder, make sure you are viewing the latest commit on this branch and not an older commit or a different branch.

## Confirmed Current Branch

```bash
git branch --show-current
# work
```

## Main Application Folders

- `backend/` contains the Node.js + Express.js + MongoDB/Mongoose + JWT API.
- `frontend/` contains the React + React Router + Context API + Bootstrap client.
- `README.md` contains setup and run instructions.
- `PROJECT_STRUCTURE.md` lists the complete committed file tree.

## Important Files Added

### Backend

- `backend/server.js`
- `backend/app.js`
- `backend/config/db.js`
- `backend/models/User.js`
- `backend/models/Stadium.js`
- `backend/models/Reservation.js`
- `backend/models/Message.js`
- `backend/controllers/authController.js`
- `backend/controllers/stadiumController.js`
- `backend/controllers/reservationController.js`
- `backend/controllers/messageController.js`
- `backend/routes/authRoutes.js`
- `backend/routes/stadiumRoutes.js`
- `backend/routes/reservationRoutes.js`
- `backend/routes/messageRoutes.js`
- `backend/middleware/authMiddleware.js`
- `backend/middleware/errorMiddleware.js`
- `backend/middleware/validateMiddleware.js`
- `backend/middleware/loggerMiddleware.js`

### Frontend

- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/components/NavBar.jsx`
- `frontend/src/components/ProtectedRoute.jsx`
- `frontend/src/components/StadiumCard.jsx`
- `frontend/src/components/SlotBadge.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Search.jsx`
- `frontend/src/pages/StadiumDetails.jsx`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/pages/AddStadium.jsx`
- `frontend/src/pages/MyReservations.jsx`
- `frontend/src/pages/Messages.jsx`
- `frontend/src/pages/OwnerStats.jsx`
- `frontend/src/services/api.js`
- `frontend/src/styles.css`

## How to Check Locally

```bash
git ls-files backend frontend README.md PROJECT_STRUCTURE.md WHERE_IS_THE_APP.md
```

You should see the backend and frontend files listed above.
