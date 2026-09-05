import Joi from 'joi';

function isValid(schema) {

    return (req, res, next) => {

        const { error, value } = schema.validate(req.body,
            {
                abortEarly: false,
                stripUnknown: true
            });

        // console.log('validate middleware:', this);

        if (error) {
            return res.status(400).json(
                {
                    message: 'Validation failed',
                    error: error.details.map(detail => detail.message)
                }
            )
        }
        req.body = value;
        next();
    }

}

export default isValid;