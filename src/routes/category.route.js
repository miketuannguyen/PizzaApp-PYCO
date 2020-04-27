import * as categoryController from '../controllers/category.controller'
import basicErrorResponse from '../response'
import { categoryArraySchema } from '../validations/category.schema'
import { productArraySchema } from '../validations/product.schema'

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
              schema: categoryArraySchema
            },
            ...basicErrorResponse
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
              schema: productArraySchema
            },
            ...basicErrorResponse
          }
        }
      }
    },
    handler: categoryController.findAllProductsOfCategory
  }
]

export default categoryRoute
