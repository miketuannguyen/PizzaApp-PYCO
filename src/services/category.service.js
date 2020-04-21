import * as categoryRepo from '../repositories/category.repo'

export const findAll = async () => {
  return await categoryRepo.findAll()
}
