import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isValid from '../middleware/validate.middleware.js';
import isAuthorized from '../middleware/role.middleware.js';
import { createDoctor, loginDoctor, updateDoctor, getDoctorProfile, deleteDoctor,doctorAppointments } from '../controllers/doctor.controller.js';
import { doctorRegistrationSchema, doctorLoginSchema, doctorUpdateSchema } from '../validations/doctor.validation.js';

const router = express.Router();

router.post('/doctors/register', isValid(doctorRegistrationSchema), isAuth, isAuthorized('admin'), createDoctor);
router.post('/doctor/login', isValid(doctorLoginSchema), loginDoctor);
router.patch('/doctor/profile', isAuth, isAuthorized('doctor'), isValid(doctorUpdateSchema), updateDoctor);
router.get('/doctor/profile', isAuth, isAuthorized('doctor'), getDoctorProfile);
router.delete('/doctor/profile',isAuth,isAuthorized('doctor'),deleteDoctor);
router.get('/doctor/appointments',isAuth,isAuthorized('doctor'),doctorAppointments);
export default router;