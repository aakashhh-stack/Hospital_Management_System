import express from 'express';
import { createAppointment, updateAppointmentStatus } from '../controllers/appointment.controller.js';
import isAuth from '../middleware/isAuth.js';
import isAuthorized from '../middleware/role.middleware.js';
import isValid from '../middleware/validate.middleware.js';
import { appointmentValidation, updateAppointmentStatusValidation } from '../validations/appointments.validation.js';
const router = express.Router();

router.post('/appointment',
    isAuth, isAuthorized('patient'),
    isValid(appointmentValidation),
    createAppointment
);

router.patch('/appointment/:appointmentId/status',
    isAuth, isAuthorized('doctor'),
    isValid(updateAppointmentStatusValidation),
    updateAppointmentStatus);

export default router;