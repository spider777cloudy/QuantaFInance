const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log(secretKey); // Output the key during development to copy and set in an environment variable

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Unauthorized');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};

module.exports = {
    verifyToken: exports.verifyToken,
    secretKey
  };
  