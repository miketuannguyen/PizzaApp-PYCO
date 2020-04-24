import * as productRepo from '../repositories/product.repo'

export const findAllProductsOfCategory = async (categoryId) => {
  return await productRepo.findAllProductsOfCategory(categoryId)
}

export const findProductById = async (productId) => {
  return await productRepo.findProductById(productId)
}
