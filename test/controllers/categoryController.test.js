import faker from 'faker'
import * as categoryController from '../../src/controllers/category.controller'
import mongoose from 'mongoose'
import { isBoom } from '@hapi/boom'

const chance = require('chance').Chance()

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

const mockProductsOfCategory = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategories[0]._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategories[0]._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategories[0]._id
}]

jest.mock('../../src/services/category.service', () => ({
  findAll: () => mockCategories,
  findCategoryById: (categoryId) => {
    let result = null
    mockCategories.forEach((mockCate) => {
      if (mockCate._id.equals(categoryId)) {
        result = mockCate
      }
    })
    return result
  }
}))

jest.mock('../../src/services/product.service', () => ({
  findAllProductsOfCategory: () => mockProductsOfCategory
}))

describe('Category controller unit tests', () => {
  test('Should return all categories', async () => {
    const categoryList = await categoryController.findAll({})
    expect(mockCategories).toIncludeSameMembers(categoryList)
  })

  test('Should return all products of category', async () => {
    const mockReq = { params: { categoryId: mockCategories[0]._id } }
    const productList = await categoryController.findAllProductsOfCategory(mockReq, {})
    expect(mockProductsOfCategory).toIncludeSameMembers(productList)
  })

  test('Should return boom 400 because of fake id', async () => {
    const mockReq = { params: { categoryId: new mongoose.Types.ObjectId() } }
    const result = await categoryController.findAllProductsOfCategory(mockReq, {})
    expect(isBoom(result, 400)).toBe(true)
  })
})
