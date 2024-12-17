import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ error: 'Access denied: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log('Decoded token:', decoded); // Log to verify token structure

    if (!decoded.id) {
      throw new Error('Invalid token: Missing user ID.');
    }

    req.user = { id: decoded.id }; // Attach user ID to the request
    next();
  } catch (error) {
    console.error('Token validation error:', error.message);
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

export default authenticateToken;
