/* eslint-disable no-await-in-loop */
import * as orderService from '../services/order.service'
import { findProductById } from '../services/product.service'
import { findOptionById } from '../services/option.service'
import Boom from '@hapi/boom'

export const createCODOrder = async (request, h) => {
  const { user } = request.auth.credentials
  const orderInfo = request.payload

  let totalPrice = 0
  for (const orderLine of orderInfo.orderLineArray) {
    const productInstance = await findProductById(orderLine.product)
    if (!productInstance) {
      return Boom.badRequest(`Product with ${orderLine.product} does not exist!`)
    }

    let optionArrayPrice = 0
    const { optionArray } = orderLine
    for (const optionId of optionArray) {
      const optionInstance = await findOptionById(optionId)
      if (!optionInstance) {
        return Boom.badRequest(`Option with ${optionId} does not exist!`)
      }
      if (!optionInstance.product.equals(productInstance._id)) {
        return Boom.badRequest(`Option with ${optionId} does not belong to product with ${productInstance._id} id!`)
      }
      optionArrayPrice += optionInstance.price
    }
    totalPrice += (productInstance.price + optionArrayPrice) * orderLine.quantity
  }

  const orderResult = await orderService.createCODOrder(user._id, orderInfo, totalPrice)
  return h.response(orderResult).code(201)
}

export const findAllOrdersWithFullInformation = async (request, h) => {
  return await orderService.findAllOrdersWithFullInformation()
}
