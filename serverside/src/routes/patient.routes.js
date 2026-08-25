import express from 'express';
import isAuth from "../middleware/isAuth.js";
import isValid from "../middleware/validate.middleware.js";
import isAuthorized from '../middleware/role.middleware.js';
import { registerPatientSchema, loginPatientSchema, updatePatientSchema } from '../validations/patient.validation.js';
import { registerUser, loginUser, getPatientProfile, updatePatientProfile, deletePatientProfile } from '../controllers/patient.controllers.js';
const router = express.Router();

router.post('/patients/register', isValid(registerPatientSchema), registerUser);
router.post('/patients/login', isValid(loginPatientSchema), loginUser);
router.get('/patients/profile', isAuth, getPatientProfile);
router.patch('/patients/profile', isAuth, isValid(updatePatientSchema), updatePatientProfile);
router.delete('/patients/profile', isAuth, deletePatientProfile);



export default router;
