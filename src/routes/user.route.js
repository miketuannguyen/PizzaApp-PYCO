import * as userController from '../controllers/user.controller'
import basicResponse from '../response'
import { userSchema, userRegisterSchema, userLoginSchema } from '../validations/user.schema'
import Joi from '@hapi/joi'

const userRoute = [
  {
    method: 'POST',
    path: '/user',
    config: {
      tags: ['api'],
      description: 'register user',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: userSchema
            },
            ...basicResponse
          }
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
          responses: {
            200: {
              description: 'Success',
              schema: Joi.object({
                user: userSchema,
                token: Joi.string().required().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                '.eyJpZCI6IjVlOWU5Njk3NDU3ODdiMmNjNDUyNzU0ZiIsImlhdCI6MTU4NzU1Mzk1NSwiZXhwIjoxNTg3NTYxMTU1fQ' +
                '.ma6JnW8FyOvMEny8Xc7H0-z8aeqrseb_59WhFc3NYzo')
              })
            },
            ...basicResponse
          }
        },
        validate: {
          payload: userLoginSchema
        }
      },
      handler: userController.login
    }
  }
]

export default userRoute
