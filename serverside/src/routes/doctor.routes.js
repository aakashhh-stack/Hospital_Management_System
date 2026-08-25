import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isValid from '../middleware/validate.middleware.js';
import isAuthorized from '../middleware/role.middleware.js';
import { createDoctor } from '../controllers/doctor.controller.js';
import { doctorRegistrationSchema } from '../validations/doctor.validation.js';

const router = express.Router();

router.post('/doctors/register', isValid(doctorRegistrationSchema), isAuth, isAuthorized('admin'), createDoctor);

export default router;