const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;


exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Token is required.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify and decode token
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    return res.status(403).json({
      status: 403,
      message: err.name === 'TokenExpiredError'
        ? 'Token has expired. Please log in again.'
        : 'Invalid token.',
    });
  }
};
