const express = require('express');
const cors = require('cors');
const logger = require('./middleware/loggerMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const stadiumRoutes = require('./routes/stadiumRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'SWE381 Stadium API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/stadiums', stadiumRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
