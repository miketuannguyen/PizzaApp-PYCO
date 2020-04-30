import * as orderRepo from '../repositories/order.repo'

export const createCODOrder = async (userId, orderInfo) => {
  orderInfo.paymentMethod = 'COD'
  return await orderRepo.createOrder(userId, orderInfo)
}
