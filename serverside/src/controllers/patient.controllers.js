// import express from 'express'

import Patient from "../models/patient.models.js";
import Appointment from "../models/appointment.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });



// ------------------------- Patient Register Controller -----------------------------

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const isUserExist = await Patient.findOne({ email });

        if (isUserExist) {
            return res.status(409).json(
                { message: `User email already exists!` }
            );
        }
        const newUser = await Patient.create({
            name,
            email,
            password,
            phone
        });

        res.status(201).json(
            {
                message: 'User registered successfully !',
                success: true
            }
        );

    } catch (err) {
        return res.status(500).json(
            {
                message: `Server error from patient registration: ${err.message}`,
                success: false
            }
        );
    }
}

// ------------------------- Patient Login Controller -----------------------------

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await Patient.findOne(
            {
                email,
                isDeleted: { $ne: true }
            });

        if (!isUser) {
            return res.status(401).json(
                {
                    message: 'Invalid credentials or Deleted User ',
                    success: false
                }
            );
        }

        // ------------------ comparing payload password --------------------

        const isMatch = await bcrypt.compare(password, isUser.password);

        if (!isMatch) {
            return res.status(401).json(
                {
                    message: 'Invalid credential',
                    success: false
                }
            );
        }

        //  created payload object to store specific payload details only 
        const payload = {
            id: isUser._id,
            role: isUser.role
        }

        // ------------------------ generating jwt token  --------------------------

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '25min' });

        res.status(200).json({
            message: 'User successfully logged-In',
            success: true,
            token, user: {
                id: isUser._id,
                name: isUser.name,
                role: isUser.role
            }
        });

    } catch (err) {
        return res.status(500).json(
            {
                message: `Server error from patient login :${err.message} `,
                success: false
            }
        );
    }
}



// ------------------------- Patient Profile Controller -----------------------------

export const getPatientProfile = async (req, res) => {
    try {


        const user = await Patient.findOne(
            {
                _id: req.user.id,
                isDeleted: { $ne: true },
                isActive: true
            }).select('-password -__v');


        if (!user) {
            return res.status(404).json(
                {
                    message: 'User profile not found !',
                    success: false
                }
            );
        }

        res.status(200).json(
            {
                message: 'Profile fetched successfully',
                success: true, user
            }
        );

    } catch (err) {
        return res.status(500).json(
            {
                message: `Server error from patient get profile:${err.message}`,
                success: false
            }
        );
    }
}


// ------------------------- Patient Update Profile Controller -----------------------------

export const updatePatientProfile = async (req, res) => {
    try {


        const { name, email, phone } = req.body;

        const updateUser = {
            name,
            email,
            phone
        };

        // Guarding againts empty payload
        if (Object.keys(updateUser).length === 0) {

            return res.status(400).json({
                message: 'No valid fields provided for update',
                success: false
            });

        }

        const user = await Patient.findOneAndUpdate(
            { _id: req.user.id, isDeleted: { $ne: true } },
            { $set: updateUser },
            { new: true, runValidators: true })
            .select(' -password -__v')

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({ message: 'Profile updated successfully', success: true, user });


    } catch (err) {
        return res.status(500).json({ message: `Server error from patient update profile:${err.message}`, success: false });
    }
}


// ------------------------- Patient Delete Controller -----------------------------

export const deletePatientProfile = async (req, res) => {
    try {

        const deleteUser = await Patient.findOneAndUpdate(
            { _id: req.user.id, isDeleted: { $ne: true } },
            { $set: { isDeleted: true, isActive: false } },
            { new: true }).select('-password -__v');

        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found or already deleted', success: false });
        }

        res.status(200).json({ message: 'User deleted successfully !', success: true, user: deleteUser._id });
    } catch (err) {
        return res.status(500).json({ message: `Server error from  delete patient profile :${err.message}`, success: false });
    }
}

// -------------------------- Patient Appointments --------------------------------

export const myAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find(
            { patient: req.user.id }
        ).populate('doctor', 'name consultationFee specialization ');

        if (appointments.length === 0) {
            return res.status(404).json({
                message: 'You do not have any appointments yet !',
                success: false
            });
        }

        res.status(200).json({
            message: 'Appointments fetched successfully!',
            success: true,
            appointment: appointments
        });

    } catch (error) {
        console.log("Server error from patient myappointment controller:", error);
        return res.status(500).json(
            {
                message: `Server error :${err.message}`,
                success: false
            });

    }
}

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().select('-password -__v');

        if (patients.length === 0) {
            return res.status(404).json({
                message: 'No patients found !',
                success: false
            });
        }
        res.status(200).json({
            message: 'Patients fetched successfully!',
            success: true,
            patients: patients
        });

    } catch (error) {
        console.log("Server error from admin get all patients controller:", error);
        return res.status(500).json(
            {
                message: `Server error :${error.message}`,
                success: false
            });
    }
}

export const adminUpdatePatientStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        const { patientId } = req.params;

        const patient = await Patient.findOneAndUpdate({ _id: patientId, isDeleted: false },
            {
                $set: { isActive: isActive }
            },
            {
                new: true, runValidators: true
            }
        ).select('-password -__v');

        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found !',
                success: false
            });
        }

        res.status(200).json({
            message: 'Patient status updated successfully!',
            success: true,
            patient: patient
        });

    } catch (error) {
        console.log("Server error from admin get patient by id controller:", error);
        return res.status(500).json(
            {
                message: `Server error :${error.message}`,
                success: false
            });
    }
}
export const deletePatientByAdmin = async (req, res) => {
    try {

        const { patientId } = req.params;

        const patient = await Patient.findOneAndUpdate(
            { _id: patientId, isDeleted: false },
            { $set: { isDeleted: true, isActive: false } },
            {
                new: true,
                runValidators: true
            }
        ).select('-password -__v');

        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found or already deleted !',
                success: false
            });
        }

        res.status(200).json({
            message: 'Patient deleted successfully!',
            success: true,
            patient: patient._id
        });

    } catch (error) {
        console.log("Server error from admin delete patient by id controller:", error);
        return res.status(500).json(
            {
                message: `Server error :${error.message}`,
                success: false
            });
    }
}

export const restorePatientByAdmin = async (req, res) => {
    try {

        const patient = await Pateint.findOneAndUpdate(
            { _id: req.params.patientId, isDeleted: true },
            { $set: { isDeleted: false, isActive: true } },
            { new: true, runValidators: true }
        ).select('-password -__v');

        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found or not deleted !',
                success: false
            });
        }

        res.status(200).json({
            message: 'Patient restored successfully!',
            success: true,
            patient: patient
        });


    } catch (error) {
        console.log("Server error from admin restore patient by id controller:", error);
        return res.status(500).json(
            {
                message: `Server error :${error.message}`,
                success: false
            });
    }
}

