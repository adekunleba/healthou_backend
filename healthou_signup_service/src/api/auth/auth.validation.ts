import * as Joi from '@hapi/joi';

export default {
    login: {
        payload: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    },
};
