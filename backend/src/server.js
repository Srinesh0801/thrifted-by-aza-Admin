// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import stripedShirtRoutes from './routes/stripedShirtRoutes.js';
// // import plainShirtRoutes from './routes/plainShirtRoutes.js';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));



// // Make uploads folder public
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // API Routes
// app.use('/api/striped-shirts', stripedShirtRoutes);
// // app.use('/api/plain-shirts', plainShirtRoutes);
// app.use('/api/auth', authRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import stripedShirtRoutes from "./routes/stripedShirtRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route prefix
app.use("/api/auth", authRoutes);

// Test root
app.get("/", (req, res) => res.send("API running"));

// Routes
app.use("/api/striped-shirts", stripedShirtRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
