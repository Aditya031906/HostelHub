import { pool } from '../config/db.js';

// Get all meals for a specific date
export const getMealsByDate = async (date) => {
  const result = await pool.query(
    'SELECT * FROM "Meal" WHERE "date" = $1 ORDER BY CASE "mealType" WHEN \'breakfast\' THEN 1 WHEN \'lunch\' THEN 2 WHEN \'dinner\' THEN 3 END',
    [date]
  );
  return result.rows;
};

// Get a specific meal by date and type
export const getMealByDateAndType = async (date, mealType) => {
  const result = await pool.query(
    'SELECT * FROM "Meal" WHERE "date" = $1 AND "mealType" = $2',
    [date, mealType]
  );
  return result.rows[0];
};

// Create or update a meal (upsert)
export const upsertMeal = async (date, mealType, items) => {
  const existing = await getMealByDateAndType(date, mealType);

  if (existing) {
    const result = await pool.query(
      'UPDATE "Meal" SET "items" = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE "date" = $2 AND "mealType" = $3 RETURNING *',
      [items, date, mealType]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      'INSERT INTO "Meal" ("date", "mealType", "items") VALUES ($1, $2, $3) RETURNING *',
      [date, mealType, items]
    );
    return result.rows[0];
  }
};

// Delete a meal
export const deleteMeal = async (id) => {
  const result = await pool.query('DELETE FROM "Meal" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
};
