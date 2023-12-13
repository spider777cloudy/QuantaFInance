const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/authMiddleware'); // Make sure to have the correct path for your authMiddleware or config file
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.verify = async (req, res) => {
    try {
      const token = req.headers['authorization'];
  
      if (!token) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        res.status(200).json({ message: 'Token is valid' });
      });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).json({ error: 'Error verifying token' });
    }
  };



module.exports = {
    register: exports.register,
    login: exports.login,
    verify: exports.verify
  };
  
