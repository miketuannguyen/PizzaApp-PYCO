import * as userRepo from '../repositories/user.repo'

export const createUser = async (userInfo) => {
  return await userRepo.createUser(userInfo)
}

export const findByPhone = async (phone) => {
  return await userRepo.findByPhone(phone)
}

export const findById = async (userId) => {
  return userRepo.findById(userId)
}

export const authenticate = async (phone, password) => {
  const userInstance = await userRepo.findByPhone(phone)
  if (userInstance && userInstance.validPassword(password)) {
    userInstance.password = undefined
    return userInstance
  }
  return null
}
