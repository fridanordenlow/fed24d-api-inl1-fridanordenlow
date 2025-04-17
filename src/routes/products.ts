import express from 'express';
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', fetchAllProducts);
router.get('/:id', fetchSingleProduct);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
