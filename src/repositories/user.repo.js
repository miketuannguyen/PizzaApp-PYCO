import userModel from '../models/user.model'
import moment from 'moment'
import debug from '../utils/debug.utils'
import mongoose from 'mongoose'

const NAMESPACE = `userRepository-${moment.utc().toISOString()}`

export const createUser = async (userInfo) => {
  try {
    return await userModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...userInfo
    })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findByPhone = async (phone) => {
  try {
    return await userModel.findOne({ phone: phone })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findById = async (userId) => {
  try {
    return await userModel.findById(userId)
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
