import express from 'express';
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryProducts,
  fetchSingleCategory,
  updateCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', fetchAllCategories);
router.get('/:id', fetchSingleCategory);
router.get('/:id/products', fetchCategoryProducts);
router.post('/', addCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
