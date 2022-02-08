const Joi = require("joi");

const blogSchema = Joi.object({
    id:Joi.number(),
    title:Joi.string(),
    body:Joi.string(),
    category:Joi.string(),
    author_name:Joi.string(),
    userId:Joi.number(),
});

module.exports = { blogSchema };