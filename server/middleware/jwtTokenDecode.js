


const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const authMiddleware = (role) => (req, res, next) => {
  const token = req.headers.authorization;

  // if there is no token
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tokenValue = token.split(' ')[1];

  try {
    // jwt token verification
    const decodedToken = jwt.verify(tokenValue, secretKey);
    req.user = decodedToken;

    if (req.user.role !== role) {
      console.log('wrong');
      return res.status(403).json({ message: 'Forbidden' }); // Invalid role
    }

    next();
  } catch (err) {
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  userAuth: authMiddleware('user'),
  adminAuth: authMiddleware('admin'),
  hostAuth: authMiddleware('host')
};

