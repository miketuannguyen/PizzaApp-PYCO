import * as orderRepo from '../repositories/order.repo'

export const createCODOrder = async (userId, orderInfo, totalPrice) => {
  orderInfo.paymentMethod = 'COD'
  orderInfo.totalPrice = totalPrice
  return await orderRepo.createOrder(userId, orderInfo)
}

export const findAllOrdersWithFullInformation = async () => {
  return await orderRepo.findAllOrdersWithFullInformation()
}
