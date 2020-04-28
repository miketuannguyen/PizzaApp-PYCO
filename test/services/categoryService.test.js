import faker from 'faker'
import * as categoryService from '../../src/services/category.service'
import mongoose from 'mongoose'

const mockCategories = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  imageUrl: faker.image.imageUrl()
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  imageUrl: faker.image.imageUrl()
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  imageUrl: faker.image.imageUrl()
}]

jest.mock('../../src/repositories/category.repo', () => ({
  findAll: () => mockCategories
}))

describe('Category service unit tests', () => {
  test('Should return all categories', async () => {
    const categoryList = await categoryService.findAll({})
    expect(mockCategories).toIncludeSameMembers(categoryList);
  })
})
