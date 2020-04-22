import Joi from '@hapi/joi'

export const userSchema = Joi.object({
  _id: Joi
    .string()
    .trim()
    .required()
    .example('5e9e969745787b2cc452754f'),
  phone: Joi
    .string()
    .trim()
    .required()
    .pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'))
    .example('0903593963'),
  password: Joi
    .string()
    .trim()
    .required()
    .alphanum()
    .min(6)
    .max(20)
    .example('123456789'),
  address: Joi
    .string()
    .trim()
    .required()
    .example('01 Nguyen Thi Minh Khai')
}).label('User')

export const userRegisterSchema = Joi.object({
  phone: Joi
    .string()
    .trim()
    .required()
    .pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'))
    .example('0903593963'),
  password: Joi
    .string()
    .trim()
    .required()
    .alphanum()
    .min(6)
    .max(20)
    .example('123456789'),
  address: Joi
    .string()
    .trim()
    .required()
    .example('01 Nguyen Thi Minh Khai')
}).label('User Register')

export const userLoginSchema = Joi.object({
  phone: Joi
    .string()
    .trim()
    .required()
    .pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'))
    .example('0903593963'),
  password: Joi
    .string()
    .trim()
    .required()
    .alphanum()
    .min(6)
    .max(20)
}).label('User Login')
