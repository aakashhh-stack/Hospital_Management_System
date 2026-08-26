import Doctor from '../models/doctor.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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


// ------------------------ Doctor Login --------------------------

export const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body;

        const isExists = await Doctor.findOne({ email, isDeleted: { $ne: true }, isActive: true });

        if (!isExists) {
            return res.status(401).json(
                {
                    message: 'Invalid credentials',
                    success: false
                }
            )
        }

        const isMatch = await bcrypt.compare(password, isExists.password);

        if (!isMatch) {
            return res.status(401).json(
                {
                    message: 'Invalid credentials',
                    success: false
                }
            )
        }
        const doctorPayload = {
            id: isExists._id,
            role: isExists.role,
        }

        const token = jwt.sign(doctorPayload, process.env.JWT_SECRET, { expiresIn: '25min' });

        res.status(200).json(
            {
                message: 'Doctor Logged In successfully !',
                success: true,
                token,
                doctor: {
                    name: isExists.name,
                    specialization: isExists.specialization,
                    experience: isExists.experience,
                    isAvailable: isExists.isAvailable
                }
            }
        )

    } catch (error) {

        console.log('Server error from login doctor', error);
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

        const updateDoctor = { ...req.body };

        if (Object.keys(updateDoctor).length === 0) {

            return res.status(400).json({
                message: 'No valid fields provided for update',
                success: false
            });
        }

        const isDoctorExists = await Doctor.findOneAndUpdate(
            {
                _id: req.user.id,
                isDeleted: false
            },
            {
                $set: updateDoctor
            },
            {
                new: true, 
                runValidators: true
            })
            .select(' -password -__v')


        if (!isDoctorExists) {
            return res.status(404).json(
                {
                    message: 'Doctor not found',
                    success: false
                }
            )
        }

        res.status(200).json(
            {
                message: 'Doctor profile updated successfully !',
                success: true,
                doctor: isDoctorExists
            }
        );


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