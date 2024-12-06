
const express = require('express');
const {PrismaCLient} = require(`@prisma/client`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaCLient();
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

// register a new user route

router.post('/register', async(req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });
    res.status(201).json(newUser);
  }catch(error) {
    res.status(400).json({error: error.message});
  }
});

// login a user router

router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  try {
    const user = await prisma.userfindUnique({
      where:{email}
    });
  if (!user) {
    return res.status(400).json({ error: 'User not found'})
  }
  const isValidPassowrd = await bcrypt.compare(password, user.password);
  if (!isValidPassowrd) {
    return res.status(400).json({ error: 'Invalid Password'});
  }
  const token = jwt.sign({ userId: user.userId}, SECRET_KEY, {expiresIn: '1h'});
  res.json({token});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
})
