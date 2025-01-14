const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('./redisClient');
const { User } = require('./models');

const JWT_SECRET = 'SHA256';
const TOKEN_EXPIRATION = 3600; // 1 hour (for long-term use if needed)
const SHORT_TOKEN_EXPIRATION = 10; // 10 seconds expiry time for the token

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    await redis.set(`token:${token}`, JSON.stringify({ id: user.id }), 'EX', SHORT_TOKEN_EXPIRATION);

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  login,
  register,
};
