import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled', 'completed'],
        default: 'pending'
    },
    reason: {
        type: String,
        required: true,
        maxLength: [35, 'Maximum 35 characters are allowed']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment