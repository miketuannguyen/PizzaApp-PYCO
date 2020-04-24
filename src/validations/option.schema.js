import Joi from '@hapi/joi'

export const optionSchema = Joi.object({
  _id: Joi
    .string()
    .trim()
    .required()
    .example('5e9e969745787b2cc452754f'),
  title: Joi
    .string()
    .trim()
    .required()
    .example('Size M'),
  price: Joi
    .number()
    .required()
    .example('1'),
  type: Joi
    .string()
    .trim()
    .required()
    .example('Size'),
  product: Joi
    .string()
    .trim()
    .required()
    .example('5e9e969745787b2cc452752f')
}).label('Option')
