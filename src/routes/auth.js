import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
  try {
    const { firstname, email, username, password } = req.body;

    // Log the incoming request for debugging
    console.log('Incoming registration request:', req.body);

    // Check for missing fields
    if (!firstname || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check for existing user by email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Email or username already exists. Please choose a different one.',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        firstName: firstname,
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.userId }, SECRET_KEY, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully.',
      token: token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.userId }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'User login failed' });
  }
});

export default router;
