const Joi = require('joi');

const blogValidation = Joi.object({
    type: Joi.string().required(),
    mainHeading: Joi.string().required(),
    firstHeading: Joi.string().required(),
    firstHeadingDesc: Joi.string().required(),
    secondHeading: Joi.string().required(),
    secondHeadingFirstDesc: Joi.string().required(),
    secondHeadingSecDesc: Joi.string().required(),
    quote: Joi.string().required(),
    secondHeadingThirdDesc: Joi.string().required()
});

module.exports = {
    blogValidation
}