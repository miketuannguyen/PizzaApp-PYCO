/* eslint-disable no-await-in-loop */
import * as orderService from '../services/order.service'
import { findProductById } from '../services/product.service'
import { findOptionById } from '../services/option.service'
import Boom from '@hapi/boom'

export const createCODOrder = async (request, h) => {
  const { user } = request.auth.credentials
  const orderInfo = request.payload

  let testTotalPrice = 0
  for (const orderLine of orderInfo.orderLineArray) {
    const productInstance = await findProductById(orderLine.product)
    if (!productInstance) {
      return Boom.unauthorized(`Product with ${orderLine.product} does not exist!`)
    }

    let optionArrayPrice = 0
    const { optionArray } = orderLine
    if (optionArray) {
      for (const optionId of optionArray) {
        const optionInstance = await findOptionById(optionId)
        if (!optionInstance) {
          return Boom.unauthorized(`Option with ${optionId} does not exist!`)
        }
        if (!optionInstance.product.equals(productInstance._id)) {
          return Boom.unauthorized(`Option with ${optionId} does not belong to product with ${productInstance._id} id!`)
        }
        optionArrayPrice += optionInstance.price
      }
    }
    testTotalPrice += (productInstance.price + optionArrayPrice) * orderLine.quantity
  }

  if (testTotalPrice !== orderInfo.totalPrice) {
    return Boom.unauthorized('totalPrice is not valid.')
  }
  return await orderService.createCODOrder(user._id, orderInfo)
}
