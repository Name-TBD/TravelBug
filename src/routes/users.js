import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authMiddleware.js'; // Import the middleware

const prisma = new PrismaClient();
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(id) }, // Ensure id is converted to an integer
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch user by ID.' });
  }
});

// Fetch current user details based on the token
router.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('Request User Object:', req.user); // Log the user object for debugging

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: 'User ID missing in token.' });
    }

    const user = await prisma.user.findUnique({
      where: { userId: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ error: 'Failed to fetch user details.' });
  }
});


export default router;
