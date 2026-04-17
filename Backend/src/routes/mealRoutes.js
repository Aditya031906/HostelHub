import express from 'express';
import { getMeals, saveMeal, removeMeal } from '../controllers/mealController.js';

const router = express.Router();

router.get('/:date', getMeals);
router.put('/', saveMeal);
router.delete('/:id', removeMeal);

export default router;
