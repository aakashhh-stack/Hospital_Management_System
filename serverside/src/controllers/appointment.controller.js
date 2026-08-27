import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
    try {

        const { doctor, appointmentDate, reason } = req.body;

        const isDoctorAvailable = await Doctor.findOne(

            { _id: doctor, isDeleted: false, isActive: true }

        ).select('name  isAvailable -__v _id');

        if (!isDoctorAvailable) {
            return res.status(404).json({
                message: 'Doctor not found',
                success: false
            });
        }

        if (!isDoctorAvailable.isAvailable) {

            return res.status(409).json(
                {
                    message: 'Doctor is not available at the selected time slot.',
                    success: false
                }
            );
        }

        const newAppointment = await Appointment.create({
            patient: req.user.id,
            doctor: isDoctorAvailable._id,
            appointmentDate,
            reason
        });

        res.status(201).json(
            {
                message: 'Appointment Created Successfully !',
                success: true,
                AppointmentDetails: {
                    id: newAppointment._id,
                    date: newAppointment.appointmentDate,
                    status: newAppointment.status
                }
            }
        );

    } catch (error) {
        console.log('Server Error from createAppointment', error);
        res.status(500).json(
            {
                message: 'Server Error',
                error,
                success: false
            }
        );
    }
}