const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: createToken(user._id)
});

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('Email is already registered');
    }

    if (!['owner', 'user'].includes(role)) {
      res.status(400);
      throw new Error('Role must be owner or user');
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json(userResponse(user));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json(userResponse(user));
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, me };
