import Joi from 'joi';
export const doctorRegistration = Joi.object({
    name: Joi.string().required().max(25),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(12),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/),
    experience: Joi.number().required().min(0),
    specialization: Joi.string().required(),
    consultationFee: Joi.number().required().min(100),
    shift: Joi.string().required().valid('Morning','Afternoon','Night'),

});

export const doctorLogin = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(12),
});
