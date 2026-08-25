import mongoose from "mongoose";
import { hashedPassword } from "../utils/passwordHash.js";

const doctorSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        max: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Minimum 8 characters required'],
        maxlength: [12, 'Maximum 12 characters allowed']
    },
    role: {
        type: String,
        default: 'doctor'
    },
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Phone number must contain exactly 10 digits']
    },
    experience: {
        type: Number,
        required: true,
        min: [0, 'Experience cannot not be negative']
    },
    specialization: {
        type: String,
        required: true
    },
    consultationFee: {
        type: Number,
        required: true,
        min: [100, 'consultationFee is must be atleast 100 INR']
    },
    shift: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night'],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default :true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true }
);


doctorSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    try {

        this.password = await hashedPassword(this.password);
    } catch (error) {
        console.log('Doctor schema middleware error:', error);
        throw error
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;