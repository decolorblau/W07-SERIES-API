const { Joi } = require("express-validation");

const userSchemaValidator = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = userSchemaValidator;
