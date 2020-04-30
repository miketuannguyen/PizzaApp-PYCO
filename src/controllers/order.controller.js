import * as orderService from '../services/order.service'

export const createCODOrder = async (request, h) => {
  const { user } = request.auth.credentials
  const orderInfo = request.payload
  return await orderService.createCODOrder(user._id, orderInfo)
}
