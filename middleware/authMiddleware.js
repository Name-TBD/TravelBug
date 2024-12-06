const jwt = require('jsonwebtoken');
const SECRET_KEY= process.env.SECRET_KEY;

const authenticateToken = (req, res ,next) => {
  const token = req.headers['authorization'];
  if(!token){
    return res.status(401).json({ error : ' Access denied'});

  }
  try{
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  }catch (error) {
    res.status(400).json({ error: 'Invalid token'});
  }
};

module.exports = authenticateToken;