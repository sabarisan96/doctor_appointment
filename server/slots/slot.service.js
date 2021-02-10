const Joi = require('joi');
module.exports = {
    validateSchema(body) {
        const schema = Joi.object().keys({
            slotDate: Joi.required(),
            fromTime: Joi.required(),
            toTime: Joi.required(),
        });

        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
}

