import * as categoryService from '../services/category.service'
import * as productService from '../services/product.service'
import Boom from '@hapi/boom'

export const findAll = async (request, h) => {
  return await categoryService.findAll()
}

export const findAllProductsOfCategory = async (request, h) => {
  const { categoryId } = request.params

  const categoryInstance = await categoryService.findCategoryById(categoryId)
  if (!categoryInstance) {
    return Boom.badRequest(`Category with id ${categoryId} does not exist!`)
  }

  return await productService.findAllProductsOfCategory(categoryId)
}
