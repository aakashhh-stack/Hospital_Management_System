import Joi from 'joi';

export const appointmentValidation = Joi.object({
    doctor: Joi.string().required(),
    appointmentDate: Joi.date().greater('now').required(),
    reason: Joi.string().max(35).required()
});

export const updateAppointmentStatusValidation = Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').required()
})