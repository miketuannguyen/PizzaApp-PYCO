import Joi from '@hapi/joi'
import { optionSchema } from './option.schema'

export const orderLineSchema = Joi.object({
  product: Joi
    .string()
    .trim()
    .required()
    .example('5e9e969745787b2cc452752f'),
  optionArray: Joi
    .array()
    .items(optionSchema),
  quantity: Joi
    .number()
    .required()
    .min(0)
    .example('2')
}).label('Order Line')

export const orderSchema = Joi.object({
  orderLineArray: Joi
    .array()
    .items(orderLineSchema)
    .required()
    .label('Order Line Array'),
  phone: Joi
    .string()
    .trim()
    .required()
    .pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'))
    .example('0903593963'),
  name: Joi
    .string()
    .trim()
    .required()
    .example('Luu Tuan Nguyen'),
  address: Joi
    .string()
    .trim()
    .required()
    .example('01 Nguyen Thi Minh Khai'),
  totalPrice: Joi
    .number()
    .required()
    .min(0)
    .example('30')
}).label('Order')
