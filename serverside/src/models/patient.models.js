import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const patientSchema = mongoose.Schema({
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
        default: 'patient'
    },
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Phone number must contain exactly 10 digits']
    },
    isActive: {
        type:Boolean,
        default: true
    },
    isDeleted:{
       type:Boolean,
       default:false
    } ,

}, { timestamps: true });


// ------------------- Mongoose Middleware for hashing the password automatically --------------------

patientSchema.pre('save', async function () {

    // Here, this refer's current document
    if (!this.isModified('password')) return

    try {
        this.password = await bcrypt.hash(this.password, 10);

    } catch (err) {
        console.log('Mongoose middleware error:', err)
        throw err;
    }
})


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;