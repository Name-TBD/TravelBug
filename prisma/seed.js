

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const numUsers = 50;
const numPosts = 100;

async function seed() {
  try {
    // Clear existing data
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    // Seed users
    for (let i = 0; i < numUsers; i++) {
      const user = await prisma.user.upsert({
        where: { email: faker.internet.email() }, // Adjust the unique field here
        update: {}, // No updates if the user already exists
        create: {
          email: faker.internet.email(),
          username: faker.internet.username(),
          password: await bcrypt.hash('password123', 10),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        },
      });

      // Seed posts for each user
      for (let j = 0; j < numPosts / numUsers; j++) { // Adjust the number of posts per user
        await prisma.post.create({
          data: {
            userId: user.userId,
            imageUrl: faker.image.url(),
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            rating: faker.number.int({ min: 1, max: 5 }),
          },
        });
      }
    }

    console.log('Database has been seeded.');
  } catch (error) {
    console.error('Error seeding the database: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();


