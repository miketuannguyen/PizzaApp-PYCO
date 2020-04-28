import faker from 'faker'
import * as categoryController from '../../src/controllers/category.controller'
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

jest.mock('../../src/services/category.service', () => ({
  findAll: () => mockCategories
}))

describe('Category controller unit tests', () => {
  test('Should return all categories', async () => {
    const categoryList = await categoryController.findAll({})
    expect(mockCategories).toIncludeSameMembers(categoryList);
  })
})
