import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { email, username, password, firstname, lastname } = req.body;

  // Log incoming request
  console.log('Register Request Body:', req.body);

  // Validate required fields
  if (!email || !username || !password || !firstname || !lastname) {
    console.error('Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstname,
        lastname,
      },
    });

    const token = jwt.sign({ id: user.userId }, SECRET_KEY, { expiresIn: '1h' });
    console.log('User registered successfully:', user);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.userId }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'User login failed' });
  }
});

export default router;