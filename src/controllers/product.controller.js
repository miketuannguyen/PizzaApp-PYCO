import * as productService from '../services/product.service'
import * as optionService from '../services/option.service'
import Boom from '@hapi/boom'

export const findProductById = async (request, h) => {
  const { productId } = request.params

  const productInstance = await productService.findProductById(productId)
  if (!productInstance) {
    return Boom.badRequest(`Product with id ${productId} does not exist!`)
  }
  return productInstance
}

export const findAllOptionsOfProduct = async (request, h) => {
  const { productId } = request.params

  const productInstance = await productService.findProductById(productId)
  if (!productInstance) {
    return Boom.badRequest(`Product with id ${productId} does not exist!`)
  }

  return await optionService.findAllOptionsOfProduct(productId)
}
