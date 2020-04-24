import * as optionRepo from '../repositories/option.repo'

export const findAllOptionsOfProduct = async (productId) => {
  return await optionRepo.findAllOptionsOfProduct(productId)
}
