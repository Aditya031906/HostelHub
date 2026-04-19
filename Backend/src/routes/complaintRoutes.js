import express from 'express';
import { getComplaints, addComplaint, editComplaintStatus } from '../controllers/complaintController.js';

const router = express.Router();

router.get('/', getComplaints);
router.post('/', addComplaint);
router.put('/:id/status', editComplaintStatus);

export default router;
