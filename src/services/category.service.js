import * as categoryRepo from '../repositories/category.repo'

export const findAll = async () => {
  return await categoryRepo.findAll()
}

export const findCategoryById = async (categoryId) => {
  return await categoryRepo.findCategoryById(categoryId)
}
