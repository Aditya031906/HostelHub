import { getMealsByDate, upsertMeal, deleteMeal } from '../models/mealModel.js';

// GET /api/meals/:date - Get all meals for a date
export const getMeals = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const meals = await getMealsByDate(date);
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error getting meals:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/meals - Create or update a meal
export const saveMeal = async (req, res) => {
  try {
    const { date, mealType, items } = req.body;

    if (!date || !mealType || !items) {
      return res.status(400).json({ error: 'date, mealType, and items are required' });
    }

    if (!['breakfast', 'lunch', 'dinner'].includes(mealType)) {
      return res.status(400).json({ error: 'mealType must be breakfast, lunch, or dinner' });
    }

    const meal = await upsertMeal(date, mealType, items);
    res.status(200).json(meal);
  } catch (error) {
    console.error("Error saving meal:", error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// DELETE /api/meals/:id - Delete a meal
export const removeMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMeal(id);
    if (!deleted) return res.status(404).json({ error: 'Meal not found' });
    res.status(200).json({ message: 'Meal deleted', meal: deleted });
  } catch (error) {
    console.error("Error deleting meal:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
