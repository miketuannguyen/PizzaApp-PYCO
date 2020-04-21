import * as userService from '../services/user.service'
//import { userRegisterSchema, userLoginSchema } from '../validations/user.schema'
import Boom from '@hapi/boom'
import crypt from '../utils/crypt.utils'

export const register = async (request, h) => {
  const { phone, password, address } = request.payload

  // const { error } = userRegisterSchema.validate({ phone, password, address })
  // if (error) {
  //   return Boom.badRequest(error.details[0].message)
  // }

  const userInstance = await userService.findByPhone(phone)
  if (userInstance) {
    return Boom.badRequest('This phone number was used')
  }

  return userService.createUser({ phone, password, address })
}

export const login = async (request, h) => {
  const { phone, password } = request.payload

  // const { error } = userLoginSchema.validate({ phone, password })
  // if (error) {
  //   return Boom.badRequest(error.details[0].message)
  // }

  const userInstance = await userService.authenticate(phone, password)
  if (!userInstance) {
    return Boom.unauthorized('Invalid email or password')
  }

  const token = crypt.createAuthToken(userInstance._id)
  const response = { userInstance, token }
  return response
}
