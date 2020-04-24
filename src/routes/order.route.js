import * as orderController from '../controllers/order.controller'
import basicResponse from '../response'
import { orderSchema } from '../validations/order.schema'

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
            ...basicResponse
          }
        }
      },
      validate: {
        payload: orderSchema
      }
    },
    handler: orderController.createOrder
  }
]

export default orderRoute
