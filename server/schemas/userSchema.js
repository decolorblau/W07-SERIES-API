const { Joi } = require("express-validation");

const userSchemaValidator = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    admin: Joi.boolean().optional(),
  }),
};

module.exports = userSchemaValidator;
