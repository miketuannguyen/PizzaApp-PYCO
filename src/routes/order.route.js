import * as orderController from '../controllers/order.controller'
import basicErrorResponse from '../response'
import { orderSchema } from '../validations/order.schema'
import { JWT_BEARER_TOKEN_AUTHORIZATION } from '../config'

const orderRoute = [
  {
    method: 'POST',
    path: '/order:cod',
    config: {
      tags: ['api'],
      description: 'create cash on delivery order',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: orderSchema
            },
            ...basicErrorResponse
          }
        }
      },
      validate: {
        payload: orderSchema
      },
      auth: JWT_BEARER_TOKEN_AUTHORIZATION
    },
    handler: orderController.createCODOrder
  }
]

export default orderRoute
