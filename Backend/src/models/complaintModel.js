import { pool } from '../config/db.js';

export const getAllComplaints = async () => {
  const result = await pool.query('SELECT * FROM "Complaint" ORDER BY "createdAt" DESC');
  return result.rows;
};

export const getComplaintsByStudent = async (studentName) => {
  const result = await pool.query('SELECT * FROM "Complaint" WHERE "studentName" = $1 ORDER BY "createdAt" DESC', [studentName]);
  return result.rows;
};

export const createComplaint = async (studentName, title, description, importance) => {
  const result = await pool.query(
    'INSERT INTO "Complaint" ("studentName", "title", "description", "importance", "status") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [studentName, title, description, importance || 'normal', 'Pending']
  );
  return result.rows[0];
};

export const updateComplaintStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE "Complaint" SET "status" = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};
