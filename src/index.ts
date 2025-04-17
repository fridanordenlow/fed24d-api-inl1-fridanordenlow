import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import { connectToDatabase } from './config/db';

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Connect to DB
connectToDatabase();

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
