import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();



// Import movie data from phases
const phase1 = require("../prisma/phases/phase1");
const phase2 = require("../prisma/phases/phase2");
//const phase3 = require("../prisma/phases/phase3");
//const phase4 = require("../prisma/phases/phase4");
//const phase5 = require("../prisma/phases/phase5");

// Combine the movie data from all phases into a single array
const allPosts = [...phase1, ...phase2];



// Create a new post
router.post('/', authenticateToken, async (req, res, next) => {
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


// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch posts' });
  }
});

//GET A SPECIFIC POST BY POSTid
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: +id },
    });
    res.json(post);
  } catch (e) {
    next(e);
  }
});



export default router;
