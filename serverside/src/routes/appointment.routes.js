import express from 'express';
import { createAppointment } from '../controllers/appointment.controller.js';
import isAuth from '../middleware/isAuth.js';
import isAuthorized from '../middleware/role.middleware.js';
import isValid from '../middleware/validate.middleware.js';
import { appointmentValidation } from '../validations/appointments.validation.js';
const router = express.Router();

router.post('/appointment',
    isAuth, isAuthorized('patient'),
    isValid(appointmentValidation),
    createAppointment
);

export default router;