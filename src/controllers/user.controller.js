import * as userService from '../services/user.service'
import Boom from '@hapi/boom'
import crypt from '../utils/crypt.utils'

export const register = async (request, h) => {
  const { phone, password, address, name } = request.payload

  const userInstance = await userService.findByPhone(phone)
  if (userInstance) {
    return Boom.badRequest('This phone number was used')
  }

  return userService.createUser({ phone, password, address, name })
}

export const login = async (request, h) => {
  const { phone, password } = request.payload

  const userInstance = await userService.authenticate(phone, password)
  if (!userInstance) {
    return Boom.unauthorized('Invalid email or password')
  }

  const token = crypt.createAuthToken(userInstance._id)
  const response = { user: userInstance, token }
  return response
}
