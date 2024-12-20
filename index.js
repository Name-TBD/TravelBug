
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import postRoutes from "./src/routes/posts.js";
import usersRoutes from "./src/routes/users.js";
import uploadRoutes from "./src/routes/upload.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// CORS settings
const allowedOrigins = [
  "https://travelbugthugs.netlify.app",
  "http://localhost:4173",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());


// Root Endpoint
app.get('/', (req, res) => {
  res.send('TravelBug server is live!');
});

// Routes
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/users", usersRoutes);
app.use("/upload", uploadRoutes);

// Test Database Connection
app.get('/test-db', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
