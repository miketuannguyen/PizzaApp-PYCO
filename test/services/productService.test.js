import faker from 'faker'
import * as productService from '../../src/services/product.service'
import mongoose from 'mongoose'

const chance = require('chance').Chance()

const mockCategory = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  imageUrl: faker.image.imageUrl()
}

const mockProduct = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: new mongoose.Types.ObjectId()
}

const mockProductsOfCategory = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategory._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategory._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: mockCategory._id
}]

jest.mock('../../src/repositories/product.repo', () => ({
  findProductById: () => mockProduct,
  findAllProductsOfCategory: () => mockProductsOfCategory
}))

describe('Product service unit tests', () => {
  test('Should return all products of category', async () => {
    const productList = await productService.findAllProductsOfCategory(mockCategory._id)
    expect(mockProductsOfCategory).toIncludeSameMembers(productList);
  })

  test('Should return product match with mock product', async () => {
    const productInstance = await productService.findProductById(mockProduct._id)
    expect(productInstance).toStrictEqual(mockProduct)
  })
})
