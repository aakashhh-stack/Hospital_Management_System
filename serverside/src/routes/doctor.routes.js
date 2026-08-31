import express from 'express';
import isAuth from '../middleware/isAuth.js';
import isValid from '../middleware/validate.middleware.js';
import isAuthorized from '../middleware/role.middleware.js';

// doctor controllers 
import {
    createDoctor, loginDoctor, updateDoctor,
    getDoctorProfile, deleteDoctor, doctorAppointments,
    getAllDoctors, updateDoctorStatus, deleteDoctorByAdmin, restoreDoctorByAdmin
} from '../controllers/doctor.controller.js';

// doctor validations
import {
    doctorRegistrationSchema, doctorLoginSchema,
    doctorUpdateSchema, doctorStatusUpdateSchema
} from '../validations/doctor.validation.js';

// create router
const router = express.Router();

// -------------------------------- doctor routes ------------------------------------

// ----------------------------- create doctor --------------------------------
router.post('/doctors/register', isValid(doctorRegistrationSchema),
    isAuth, isAuthorized('admin'), createDoctor);

// ----------------------------- doctor login --------------------------------
router.post('/doctor/login', isValid(doctorLoginSchema), loginDoctor);

//----------------------------- Update doctor profile --------------------------------
router.patch('/doctor/profile', isAuth, isAuthorized('doctor'),
    isValid(doctorUpdateSchema), updateDoctor);

//  ----------------------------- getdoctor profile --------------------------------
router.get('/doctor/profile', isAuth, isAuthorized('doctor'), getDoctorProfile);

//  ----------------------------- delete doctor profile --------------------------------
router.delete('/doctor/profile', isAuth, isAuthorized('doctor'), deleteDoctor);

//  ----------------------------- get doctor appointments --------------------------------
router.get('/doctor/appointments', isAuth, isAuthorized('doctor'), doctorAppointments);


// ---------------------------- admin doctor routes -----------------------------


//  ----------------------------- admin get all doctors --------------------------------
router.get('/admin/doctor', isAuth, isAuthorized('admin'), getAllDoctors);

//  ----------------------------- admin update doctor status --------------------------------
router.patch('/admin/doctor/:doctorId/status', isAuth,
    isAuthorized('admin'), isValid(doctorStatusUpdateSchema), updateDoctorStatus);

 //  ----------------------------- admin delete doctor profile --------------------------------   
router.patch('/admin/doctor/:doctorId/delete', isAuth,
    isAuthorized('admin'), deleteDoctorByAdmin);

//  ----------------------------- admin restore doctor profile --------------------------------
router.patch('/admin/doctor/:doctorId/restore', isAuth,
    isAuthorized('admin'), restoreDoctorByAdmin);

export default router;