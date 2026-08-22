import express from 'express';
import Patient from '../models/patient.models,js';
import { registerUser, loginUser ,me} from '../controllers/patient.controllers.js';
const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me',me);

export default router;
  