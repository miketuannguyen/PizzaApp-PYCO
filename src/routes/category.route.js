import * as categoryController from '../controllers/category.controller'
import basicResponse from '../response'
import { categorySchema } from '../validations/category.schema'
import { productSchema } from '../validations/product.schema'
import Joi from '@hapi/joi'

const categoryRoute = [
  {
    method: 'GET',
    path: '/category',
    config: {
      tags: ['api'],
      description: 'get all categories',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(categorySchema)
            },
            ...basicResponse
          }
        }
      }
    },
    handler: categoryController.findAll
  },
  {
    method: 'GET',
    path: '/category/{categoryId}/product',
    config: {
      tags: ['api'],
      description: 'get all products of category',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(productSchema)
            },
            ...basicResponse
          }
        }
      }
    },
    handler: categoryController.findAllProductsOfCategory
  }
]

export default categoryRoute
