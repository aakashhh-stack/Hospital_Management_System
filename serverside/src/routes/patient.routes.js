import express from 'express';
import Patient from '../models/patient.models,js';
import { registerUser, loginUser, getPatientProfile, updatePatientProfile, deletePatientProfile } from '../controllers/patient.controllers.js';
const router = express.Router();

router.post('/patients/register', registerUser);
router.post('/patients/login', loginUser);
router.get('/patients/profile', getPatientProfile);
router.patch('/patients/profile', updatePatientProfile);
router.delete('/patients/profile', deletePatientProfile);

export default router;
