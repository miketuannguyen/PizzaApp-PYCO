import * as orderController from '../controllers/order.controller'
import basicErrorResponse from '../response'
import { orderSchema, orderResponseSchema } from '../validations/order.schema'
import { JWT_BEARER_TOKEN_AUTHORIZATION } from '../config'
import Joi from '@hapi/joi'

const orderRoute = [
  {
    method: 'GET',
    path: '/order',
    config: {
      tags: ['api'],
      description: 'get all orders',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(orderResponseSchema).label('Order Response Array')
            }
          }
        }
      }
    },
    handler: orderController.getAllOrders
  },
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
              schema: orderResponseSchema
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
