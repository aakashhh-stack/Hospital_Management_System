import Joi from 'joi';
export const doctorRegistrationSchema = Joi.object({
    name: Joi.string().required().max(25),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(12),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/),
    experience: Joi.number().required().min(0),
    specialization: Joi.string().required(),
    consultationFee: Joi.number().required().min(100),
    shift: Joi.string().required().valid('Morning', 'Afternoon', 'Night'),

});

export const doctorLoginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(12),
});

export const doctorUpdateSchema = Joi.object({
    name: Joi.string().max(25),
    phone: Joi.string().pattern(/^[0-9]{10}$/),
    experience: Joi.number().min(0),
    specialization: Joi.string(),
    consultationFee: Joi.number().min(100),
    shift: Joi.string().valid('Morning', 'Afternoon', 'Night'),
    isAvailable: Joi.boolean()
}).min(1);

export const doctorStatusUpdateSchema = Joi.object({
    isActive: Joi.boolean().required().valid(true, false)
});