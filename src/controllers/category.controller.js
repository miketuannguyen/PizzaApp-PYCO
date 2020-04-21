import * as categoryService from '../services/category.service'
import * as productService from '../services/product.service'

export const findAll = async (request, h) => {
  return await categoryService.findAll()
}

export const findAllProductsOfCategory = async (request, h) => {
  const { categoryId } = request.params

  return await productService.findAllProductsOfCategory(categoryId)
}
