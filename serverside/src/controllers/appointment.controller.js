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
        return res.status(500).json(
            {
                message: `Server Error: ${error.message}`,
                success: false
            }
        );
    }
}

export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findOne(
            {
                _id: req.params.appointmentId,
                doctor: req.user.id
            }

        );

        if (!appointment) {
            return res.status(404).json({
                message: 'Appointment not found',
                success: false
            });
        }


        const appointmentUpdate = {
            pending: ['confirmed', 'cancelled'],
            confirmed: ['completed', 'cancelled']
        }

        if (!appointmentUpdate[appointment.status]?.includes(status)) {
            return res.status(400).json({
                message: `Invalid status transition from ${appointment.status} to ${status}`,
                success: false
            })
        }


        // if (appointment.status === 'completed' || appointment.status === 'cancelled') {
        //     return res.status(400).json({
        //         message: 'Cannot update status of a completed or cancelled appointment',
        //         success: false
        //     });
        // }
        // if (appointment.status === 'pending' && status === 'completed') {
        //     return res.status(400).json(
        //         {
        //             message: 'Cannot mark a pending appointment as completed. It must be confirmed first.',
        //             success: false
        //         })
        // }

        appointment.status = status;
        await appointment.save();

        return res.status(200).json({
            message: 'Appointment status updated successfully',
            success: true,
            data: appointment
        });

    } catch (error) {
        console.log('Server Error from updateAppointmentStatus', error);
        return res.status(500).json(
            {
                message: `Server Error: ${error.message}`,
                success: false
            }
        );
    }
}

export const getAllAppointmentsByAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email')
            .populate('doctor', 'name email specialization experience consultationFee')
            .select('-__v');

        // Check if appointments array is empty
        if (appointments.length === 0) {
            return res.status(404).json({
                message: 'No appointments found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Appointments fetched successfully',
            success: true,
            data: appointments
        });

    } catch (error) {
        console.log('Server Error from getAllAppointmentsByAdmin', error);
        return res.status(500).json(
            {
                message: `Server Error: ${error.message}`,
                success: false
            }
        );
    }
}