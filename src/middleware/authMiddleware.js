import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract Bearer token
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id }; // Attach user ID to request object
    next();
  } catch (error) {
    console.error("Token validation error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
