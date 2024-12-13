import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Include user details
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch posts' });
  }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { postId: Number(id) },
      include: {
        user: true,  // Include user details
        comments: {
          include: {
            user: true, // Include user details for comments
          },
        },
        likes: true, // Include likes
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch the post' });
  }
});

// Create a new post
router.post('/', authenticateToken, async (req, res) => {
  const { userId, imageUrl, title, description, startDate, endDate, rating } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        title,
        description,
        rating,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
