const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'backend/app.js',
  'backend/server.js',
  'backend/config/db.js',
  'backend/controllers/authController.js',
  'backend/controllers/stadiumController.js',
  'backend/controllers/reservationController.js',
  'backend/controllers/messageController.js',
  'backend/middleware/authMiddleware.js',
  'backend/middleware/errorMiddleware.js',
  'backend/middleware/loggerMiddleware.js',
  'backend/middleware/validateMiddleware.js',
  'backend/models/User.js',
  'backend/models/Stadium.js',
  'backend/models/Reservation.js',
  'backend/models/Message.js',
  'backend/routes/authRoutes.js',
  'backend/routes/stadiumRoutes.js',
  'backend/routes/reservationRoutes.js',
  'backend/routes/messageRoutes.js',
  'frontend/index.html',
  'frontend/src/main.jsx',
  'frontend/src/App.jsx',
  'frontend/src/context/AuthContext.jsx',
  'frontend/src/components/NavBar.jsx',
  'frontend/src/components/ProtectedRoute.jsx',
  'frontend/src/components/StadiumCard.jsx',
  'frontend/src/components/SlotBadge.jsx',
  'frontend/src/pages/Home.jsx',
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Register.jsx',
  'frontend/src/pages/Search.jsx',
  'frontend/src/pages/StadiumDetails.jsx',
  'frontend/src/pages/Dashboard.jsx',
  'frontend/src/pages/AddStadium.jsx',
  'frontend/src/pages/MyReservations.jsx',
  'frontend/src/pages/Messages.jsx',
  'frontend/src/pages/OwnerStats.jsx',
  'frontend/src/services/api.js',
  'frontend/src/styles.css'
];

const bannedWords = [
  'next/',
  'next.config',
  'typescript',
  'redux',
  'tailwind',
  'graphql',
  'prisma',
  'docker',
  'firebase',
  'zustand',
  'socket.io'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missingFiles.length > 0) {
  console.error('Missing required project files:');
  missingFiles.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const scanFiles = requiredFiles.filter((file) => file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html'));
const violations = [];

scanFiles.forEach((file) => {
  const content = fs.readFileSync(path.join(root, file), 'utf8').toLowerCase();
  bannedWords.forEach((word) => {
    if (content.includes(word)) {
      violations.push(`${file} contains banned technology reference: ${word}`);
    }
  });
});

if (violations.length > 0) {
  console.error('Project rule violations found:');
  violations.forEach((violation) => console.error(`- ${violation}`));
  process.exit(1);
}

console.log('SWE381 stadium project files are present in the repo.');
console.log(`Checked ${requiredFiles.length} required files.`);
console.log('No banned technology references found in application files.');
