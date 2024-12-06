

/*dummy 

import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
//router.get("/:id", verifyToken, getUser);
//router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
//router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

//export default router;

const express = require('express');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


// get all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(id) }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;