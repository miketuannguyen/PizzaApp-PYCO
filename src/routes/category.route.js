import * as categoryController from '../controllers/category.controller'
import basicResponse from '../response'

const categoryRoute = [
  {
    method: 'GET',
    path: '/category',
    config: {
      tags: ['api'],
      description: 'get all categories',
      plugins: {
        'hapi-swagger': {
          responses: basicResponse
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
          responses: basicResponse
        }
      }
    },
    handler: categoryController.findAllProductsOfCategory
  }
]

export default categoryRoute
