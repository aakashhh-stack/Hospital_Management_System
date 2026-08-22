// import express from 'express'

import Patient from "../models/patient.models.js";


// ------------------------- User Register Controller -----------------------------

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const isUserExist = await Patient.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({ message: `User email already exists!` })
        }
        const newUser = await Patient.create({
            name,
            email,
            password,
            phone
        });

        res.status(201).json({ message: 'User registred successfully !', success: true })

    } catch (err) {
        return res.status(500).json({ message: `Server error from patient registration: ${err.message}` })
    }
}

// ------------------------- User Login Controller -----------------------------

export const loginUser = async (req, res) => {
    try {

    } catch (err) {
        return res.status.json({ message: `Server error from patient login :${err.message}` })
    }
}



// ------------------------- User Login Controller -----------------------------

export const getPatientProfile = async (req, res) => {
    try {

    } catch (err) {
        return res.status.json({ message: `Server error from patient me:${err.message}` })
    }
}


// ------------------------- User Login Controller -----------------------------

export const updatePatientProfile = async (req, res) => {
    try {

    } catch (err) {
        return res.status.json({ message: `Server error from patient me:${err.message}` })
    }
}


// ------------------------- User Login Controller -----------------------------

export const deletePatientProfile = async (req, res) => {
    try {

    } catch (err) {
        return res.status.json({ message: `Server error from patient me:${err.message}` })
    }
}
