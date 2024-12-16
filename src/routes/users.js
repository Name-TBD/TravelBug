import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authMiddleware.js'; // Import the middleware

const prisma = new PrismaClient();
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Added this /me to personalize the post feed after login/registration
// Fetch current user details based on the token
router.get('/me', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'Invalid token or user data missing' });
    }

    const user = await prisma.user.findUnique({ where: { userId: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});




export default router;
