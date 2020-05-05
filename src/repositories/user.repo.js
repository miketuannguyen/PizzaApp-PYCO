import userModel from '../models/user.model'
import moment from 'moment'
import debug from '../utils/debug.utils'

const NAMESPACE = `userRepository-${moment.utc().toISOString()}`

export const createUser = async (userInfo) => {
  try {
    return await userModel.create({ ...userInfo })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findByPhone = async (phone) => {
  try {
    return await userModel.findOne({ phone })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findUserById = async (userId) => {
  try {
    return await userModel.findById(userId)
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
