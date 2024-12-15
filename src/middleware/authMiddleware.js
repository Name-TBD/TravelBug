import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY); // Verify token
    req.user = verified; // Attach user to request
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

export default authenticateToken;
