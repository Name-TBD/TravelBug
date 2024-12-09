const express = require('express');
const { PrismaClient} = require('@prisma/client');
const authenticateToken = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// create a new post

router.post('/', authenticateToken, async(req, res, next) => {
  const {userId, imageUrl, title, description, startDate, endDate, rating} = req.body
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        title,
        description,
        rating,
        startDate,
        endDate
      }
    });
    res.status (201).json(newPost);
  }catch(error){
    res.status(400).json({ error: error.message});
  }
});

//get all posts

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

module.exports = router;