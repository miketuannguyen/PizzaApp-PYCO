import * as orderController from '../controllers/order.controller'
import basicErrorResponse from '../response'
//import { orderSchema } from '../validations/order.schema'
import { JWT_BEARER_TOKEN_AUTHORIZATION } from '../config'

const orderRoute = [
  {
    method: 'POST',
    path: '/order',
    config: {
      tags: ['api'],
      description: 'create order',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success'
            },
            ...basicErrorResponse
          }
        }
      },
      // validate: {
      //   payload: orderSchema
      // },
      auth: JWT_BEARER_TOKEN_AUTHORIZATION
    },
    handler: orderController.createOrder
  }
]

export default orderRoute
