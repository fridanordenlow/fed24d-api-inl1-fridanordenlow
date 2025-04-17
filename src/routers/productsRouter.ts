import express from 'express';
import { fetchAllProducts } from '../controller/productController';

const router = express.Router();

// The route has path "products" written in index.ts
router.get('/', fetchAllProducts);
// router.get('/:id', fetch);
// router.post('/', fetch); // Skapa en produkt
// router.patch('/:id', fetch); // Uppdatera en produkt
// router.delete('/:id', fetch); // Radera en produkt

export default router;
