import express from 'express';
import isAuth from "../middleware/isAuth.js";
import isValid from "../middleware/validate.middleware.js";
import isAuthorized from '../middleware/role.middleware.js';

// ------------------- Patient validations -------------------
import {
    registerPatientSchema, loginPatientSchema,
    updatePatientSchema, patientStatusUpdateSchema
} from '../validations/patient.validation.js';

//------------------- Patient controllers -------------------
import {
    registerUser, loginUser, getPatientProfile,
    updatePatientProfile, deletePatientProfile, myAppointments,
    getAllPatients, adminUpdatePatientStatus, deletePatientByAdmin,
    restorePatientByAdmin
} from '../controllers/patient.controllers.js';

// create router
const router = express.Router();

// ------------------- Patient routes -------------------

// ------------------- Patient Register -------------------
router.post('/patients/register', isValid(registerPatientSchema), registerUser);

// ------------------- Patient Login -------------------
router.post('/patients/login', isValid(loginPatientSchema), loginUser);

// ------------------- GetPatient Profile -------------------
router.get('/patients/profile', isAuth, getPatientProfile);

// ------------------- Update Patient Profile -------------------
router.patch('/patients/profile', isAuth, isValid(updatePatientSchema),
    updatePatientProfile);

// ------------------- Delete Patient Profile -------------------
router.delete('/patients/profile', isAuth, deletePatientProfile);

// ------------------- Get Patient Appointments -------------------
router.get('/patients/myappointments', isAuth, isAuthorized('patient'), myAppointments);

//------------------- Admin Get All Patients -------------------
router.get('/admin/patients', isAuth, isAuthorized('admin'), getAllPatients);

//------------------- Admin Get Patient By Id -------------------
router.patch('/admin/patients/:patientId/status', isAuth, isAuthorized('admin')
    , isValid(patientStatusUpdateSchema), adminUpdatePatientStatus);

//------------------- Admin Delete Patient By Id -------------------
router.delete('/admin/patients/:patientId/delete',
    isAuth, isAuthorized('admin'), deletePatientByAdmin);

//------------------- Admin Restore Patient By Id -------------------
router.patch('/admin/patients/:patientId/restore', isAuth, isAuthorized('admin')
    , restorePatientByAdmin);
export default router;
