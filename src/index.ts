import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/db';
// import 'dotenv/config';

// dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
import productsRouter from './routers/productsRouter';
app.use('/products', productsRouter);

// Connect to DB
connectToDatabase();

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
