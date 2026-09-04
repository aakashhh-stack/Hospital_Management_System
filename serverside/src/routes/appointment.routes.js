import express from 'express';
import { createAppointment, updateAppointmentStatus } from '../controllers/appointment.controller.js';
import isAuth from '../middleware/isAuth.js';
import isAuthorized from '../middleware/role.middleware.js';
import isValid from '../middleware/validate.middleware.js';
import { appointmentValidation, updateAppointmentStatusValidation } from '../validations/appointments.validation.js';
const router = express.Router();

//------------------- Appointment routes -------------------
router.post('/appointment',
    isAuth, isAuthorized('patient'),
    isValid(appointmentValidation),
    createAppointment
);

// ------------------- Doctor Update Appointment Status -------------------

router.patch('/appointment/:appointmentId/status',
    isAuth, isAuthorized('doctor'),
    isValid(updateAppointmentStatusValidation),
    updateAppointmentStatus);

// ------------------- Admin Get All Appointments -------------------
router.get('/admin/appointments',
    isAuth,
    isAuthorized('admin'),
    getAllAppointmentsByAdmin
);

export default router;