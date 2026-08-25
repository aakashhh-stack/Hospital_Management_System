import Doctor from '../models/doctor.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });


// ------------------------ Create Doctor ------------------------------ 
export const createDoctor = async (req, res) => {
    try {

        const { name, email, password, phone, specialization, experience, shift, consultationFee } = req.body;
        const isExists = await Doctor.findOne({ email });
        if (isExists) {
            return res.status(409).json(
                {
                    message: 'Email already exists!',
                    success: false
                }
            )
        }
        
        const newDoctor = await Doctor.create({
            name,
            email,
            password,
            phone,
            specialization,
            experience,
            shift,
            consultationFee
        })

        res.status(201).json(
            {
                message: 'Doctor Registered Successfully !',
                success: true,
                doctor: {
                    id: newDoctor._id,
                    role: newDoctor.role
                }
            }
        );

    } catch (error) {
        console.log('Server error from create doctor', error);
        return res.status(500).json(
            {
                message: `Server error: ${error.message}`,
                success: false
            }
        );
    }
}


// ------------------------ Update Doctor ------------------------------ 

export const updateDoctor = async (req, res) => {
    try {


    } catch (error) {
        console.log('Server error from update doctor', error);
        return res.status(500).json(
            {
                message: `Server error: ${error.message}`,
                success: false
            }
        );
    }
}


// ------------------------ Delete Doctor ------------------------------ 

export const deleteDoctor = async (req, res) => {
    try {


    } catch (error) {
        console.log('Server error from delete doctor', error);
        return res.status(500).json(
            {
                message: `Server error: ${error.message}`,
                success: false
            }
        );
    }
}

// ------------------------ Get Doctor profile ------------------------------ 

export const getDoctorProfile = async (req, res) => {
    try {


    } catch (error) {
        console.log('Server error from get doctor profile', error);

        return res.status(500).json(
            {
                message: `Server error: ${error.message}`,
                success: false
            }
        );
    }
}