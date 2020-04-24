import * as productService from '../services/product.service'
import * as optionService from '../services/option.service'

export const findProductById = async (request, h) => {
  const { productId } = request.params
  return await productService.findProductById(productId)
}

export const findAllOptionsOfProduct = async (request, h) => {
  const { productId } = request.params
  return await optionService.findAllOptionsOfProduct(productId)
}
