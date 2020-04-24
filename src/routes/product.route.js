import * as productController from '../controllers/product.controller'
import basicResponse from '../response'
import { productSchema } from '../validations/product.schema'
import { optionSchema } from '../validations/option.schema'
import Joi from '@hapi/joi'

const productRoute = [
  {
    method: 'GET',
    path: '/product/{productId}',
    config: {
      tags: ['api'],
      description: 'get product by productId',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: productSchema
            },
            ...basicResponse
          }
        }
      },
      handler: productController.findProductById
    }
  },
  {
    method: 'GET',
    path: '/product/{productId}/option',
    config: {
      tags: ['api'],
      description: 'get all options of product',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(optionSchema).label('Option Array')
            },
            ...basicResponse
          }
        }
      },
      handler: productController.findAllOptionsOfProduct
    }
  }
]

export default productRoute
