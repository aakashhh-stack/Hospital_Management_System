import Joi from 'joi'

export const registerPatientSchema = Joi.object(
    {
        name: Joi.string().required().max(25),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(12),
        phone: Joi.string().required().pattern(/^[0-9]{10}$/),
    }
)


export const loginPatientSchema = Joi.object(
    {

        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(12),

    }
)

export const updatePatientSchema = Joi.object(
    {
        name: Joi.string().required().max(25),
        email: Joi.string().required().email(),
        phone: Joi.string().required().pattern(/^[0-9]{10}$/),

    }
).min(1);

export const patientStatusUpdateSchema = Joi.object({
    isActive: Joi.boolean().required()
});