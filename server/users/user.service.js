const Joi = require('joi');
module.exports = {
    validateSchema(body) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            age: Joi.number().required(),
            gender: Joi.string().required(),
            profilePic: Joi.required(),
            contactNo: Joi.string().required(),
        });

        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
}

