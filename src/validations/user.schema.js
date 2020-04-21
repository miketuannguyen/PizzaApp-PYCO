import Joi from '@hapi/joi'

export const userRegisterSchema = Joi.object({
  phone: Joi.string().trim().required().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')),
  password: Joi.string().trim().required().alphanum().min(6).max(20),
  address: Joi.string().trim().required()
})

export const userLoginSchema = Joi.object({
  phone: Joi.string().trim().required().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')),
  password: Joi.string().trim().required().alphanum().min(6).max(20)
})
