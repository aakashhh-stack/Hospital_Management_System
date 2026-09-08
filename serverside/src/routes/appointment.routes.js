import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isAuthorized from '../middleware/role.middleware.js';
import isValid from '../middleware/validate.middleware.js';

//------------------- Appointment Controller -------------------
import {
    createAppointment, updateAppointmentStatus,
    getAllAppointmentsByAdmin, updateAppointmentStatusByAdmin,
    deleteAppointmentByAdmin, restoreAppointmentByAdmin
}
    from '../controllers/appointment.controller.js';

//------------------- Appointment Validation -------------------
import {
    appointmentValidation,
    updateAppointmentStatusValidation
}
    from '../validations/appointments.validation.js';

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

// ------------------- Admin Update Appointment Status -------------------
router.patch('/admin/appointment/:appointmentId/status', isAuth,
    isAuthorized('admin'), isValid(updateAppointmentStatusValidation)
    , updateAppointmentStatusByAdmin);

// ------------------- Admin Delete Appointment -------------------
router.delete('/admin/appointment/:appointmentId',
    isAuth, isAuthorized('admin'), deleteAppointmentByAdmin);

//--------------------- Admin Restore Appointment -------------------
router.patch('/admin/appointment/:appointmentId/restore',
    isAuth, isAuthorized('admin'), restoreAppointmentByAdmin);

export default router;

