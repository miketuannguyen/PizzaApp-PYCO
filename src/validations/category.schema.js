import Joi from '@hapi/joi'

export const categorySchema = Joi.object({
  title: Joi
    .string()
    .trim()
    .required()
    .example('Pizza'),
  imageUrl: Joi
    .string()
    .trim()
    .required()
    .example('https://pasgo.vn/Upload/anh-chi-tiet/nha-hang-the-pizza-company-royal-city-1-normal-1320212618915.jpg')
}).label('Category')
