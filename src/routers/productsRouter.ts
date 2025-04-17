import express from 'express';
import {
  addProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} from '../controller/productController';

const router = express.Router();

// The route has path "products" written in index.ts
router.get('/', fetchAllProducts);
router.get('/:id', fetchSingleProduct);
router.post('/', addProduct); // Skapa en produkt
router.patch('/:id', updateProduct); // Uppdatera en produkt
// router.delete('/:id', fetch); // Radera en produkt

export default router;
