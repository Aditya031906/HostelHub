import { getAllComplaints, getComplaintsByStudent, createComplaint, updateComplaintStatus } from '../models/complaintModel.js';

export const getComplaints = async (req, res) => {
  try {
    const { studentName } = req.query;
    let complaints;
    if (studentName) {
      complaints = await getComplaintsByStudent(studentName);
    } else {
      complaints = await getAllComplaints();
    }
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addComplaint = async (req, res) => {
  try {
    // Note: Once auth is implemented, studentName will be extracted from user token/session
    const { studentName, title, description, importance } = req.body;
    
    if (!studentName || !title || !description) {
      return res.status(400).json({ error: 'StudentName, title, and description are required' });
    }

    const complaint = await createComplaint(studentName, title, description, importance);
    res.status(201).json(complaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Received', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const complaint = await updateComplaintStatus(id, status);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
