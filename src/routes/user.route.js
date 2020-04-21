import * as userController from '../controllers/user.controller'
import basicResponse from '../response'
import { userRegisterSchema, userLoginSchema } from '../validations/user.schema'

const userRoute = [
  {
    method: 'POST',
    path: '/user',
    config: {
      tags: ['api'],
      description: 'register user',
      plugins: {
        'hapi-swagger': {
          responses: basicResponse
        }
      },
      validate: {
        payload: userRegisterSchema
      }
    },
    handler: userController.register
  },
  {
    method: 'POST',
    path: '/user/login',
    config: {
      tags: ['api'],
      description: 'login user',
      plugins: {
        'hapi-swagger': {
          responses: basicResponse
        }
      },
      validate: {
        payload: userLoginSchema
      }
    },
    handler: userController.login
  }
]

export default userRoute
