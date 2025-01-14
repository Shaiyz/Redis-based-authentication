const express = require('express');
const authController = require('../authController');
const router = express.Router();
const verifyTokenWithRedis = require('../middleware/verifyTokenWithRedis.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', verifyTokenWithRedis, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
module.exports = router;
