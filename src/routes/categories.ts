import express from 'express';
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
  fetchSingleCategory,
  updateCategory,
} from '../controllers/categoryController';

const router = express.Router();

router.get('/', fetchAllCategories);
router.get('/:id', fetchSingleCategory);
router.post('/', addCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
