const jwt = require('jsonwebtoken');
const redis = require('../redisClient'); // Adjust path as necessary

const JWT_SECRET = 'SHA256';

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from 'Bearer token' format
  
  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    
    jwt.verify(token, JWT_SECRET);

    const storedToken = await redis.get(`token:${token}`);
    if (!storedToken) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    req.user = JSON.parse(storedToken);
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authenticateToken;
