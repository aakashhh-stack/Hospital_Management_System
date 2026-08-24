import express from 'express';
import isAuth from "../middleware/isAuth.js";
import { registerUser, loginUser, getPatientProfile, updatePatientProfile, deletePatientProfile } from '../controllers/patient.controllers.js';
const router = express.Router();

router.post('/patients/register', registerUser);
router.post('/patients/login', loginUser);
router.get('/patients/profile', isAuth, getPatientProfile);
router.patch('/patients/profile', isAuth, updatePatientProfile);
router.delete('/patients/profile', isAuth, deletePatientProfile);

export default router;
