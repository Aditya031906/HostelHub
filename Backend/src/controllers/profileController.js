import { getProfileByUserId, upsertProfile, getAllProfilesWithUsers } from '../models/profileModel.js';
import { findUserByFirebaseUid } from '../models/userModel.js';

export const getProfile = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    if (!firebaseUid) return res.status(400).json({ error: 'firebaseUid is required' });

    let profile = await getProfileByUserId(firebaseUid);
    const user = await findUserByFirebaseUid(firebaseUid);

    if (!profile) profile = {}; // Return empty if not created yet
    res.status(200).json({ ...profile, user });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfilesWithUsers();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error getting all profiles:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firebaseUid } = req.body;
    if (!firebaseUid) return res.status(400).json({ error: 'firebaseUid is required' });

    const updatedProfile = await upsertProfile(firebaseUid, req.body);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
