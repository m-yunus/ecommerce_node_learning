const jwt = require('jsonwebtoken');

// Middleware for verifying JWT tokens
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).send('Token not found');
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
  
  if (!token) {
    return res.status(403).send('Token not found');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Extract the userId from the decoded token
  } catch (err) {
    return res.status(401).send('Invalid token');
  }

  return next();
}

module.exports = verifyToken;
