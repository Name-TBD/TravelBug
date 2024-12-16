import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: true, // Fetch user details for each post
      },
    });

    const totalPosts = await prisma.post.count();
    res.json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});
// Create a post
router.post('/', authenticateToken, async (req, res) => {
  const { userId, imageUrl, title, description, startDate, endDate, rating } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        title,
        description,
        startDate,
        endDate,
        rating,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

// Like a post
router.put('/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await prisma.post.update({
      where: { postId: parseInt(id) },
      data: {
        likes: {
          connect: { userId },
        },
      },
      include: { likes: true },
    });

    res.json(post);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post.' });
  }
});

// Comment on a post
router.post('/:id/comments', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        postId: parseInt(id),
        userId,
        text,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment.' });
  }
});

export default router;