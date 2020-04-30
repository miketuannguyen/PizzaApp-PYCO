import orderModel from '../models/order.model'
import moment from 'moment'
import debug from '../utils/debug.utils'

const NAMESPACE = `orderRepository-${moment.utc().toISOString()}`

export const createOrder = async (userId, orderInfo) => {
  try {
    return await orderModel.create({ user: userId, ...orderInfo })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
