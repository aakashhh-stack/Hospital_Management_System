import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
    try {

        const { doctor, appointmentDate, reason } = req.body;

        const doctorExists = await Doctor.findOne(

            { _id: doctor, isDeleted: false, isActive: true }

        ).select('isAvailable _id');

        if (!doctorExists) {
            return res.status(404).json({
                message: 'Doctor not found',
                success: false
            });
        }

        if (!doctorExists.isAvailable) {

            return res.status(409).json(
                {
                    message: 'Doctor is not available at the selected time slot.',
                    success: false
                }
            );
        }

        const appointmentExists = await Appointment.findOne({
            doctor,
            appointmentDate,
            status: { $nin: ['cancelled', 'completed'] }
        });

        if (appointmentExists) {

            return res.status(409).json(
                {
                    message: 'Doctor already has an appointment at this time.',
                    success: false
                }
            );
        }


        const newAppointment = await Appointment.create({
            patient: req.user.id,
            doctor: doctorExists._id,
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

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const appointment = await Appointment.findByIdAndUpdate(
            {
                _id: req.params.appointmentId,
                doctor: req.user.id
            },
            { $set: { status } },
            {
                new: true,
                runValidators: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                message: 'Appointment not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Appointment status updated successfully',
            success: true,
            data: appointment
        });

    } catch (error) {
        console.log('Server Error from updateAppointmentStatus', error);
        res.status(500).json(
            {
                message: 'Server Error',
                error,
                success: false
            }
        );
    }
}
