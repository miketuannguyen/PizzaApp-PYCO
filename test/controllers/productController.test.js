import faker from 'faker'
import * as productController from '../../src/controllers/product.controller'
import mongoose from 'mongoose'
import { isBoom } from '@hapi/boom'

const chance = require('chance').Chance()

const mockProduct = {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: new mongoose.Types.ObjectId()
}

const mockOptionsOfProduct = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProduct._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProduct._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProduct._id
}]

jest.mock('../../src/services/product.service', () => ({
  findProductById: (productId) => {
    if (mockProduct._id.equals(productId)) {
      return mockProduct
    }
    return null
  }
}))

jest.mock('../../src/services/option.service', () => ({
  findAllOptionsOfProduct: () => mockOptionsOfProduct
}))

describe('Product controller unit tests', () => {
  test('Should return product match with mock product', async () => {
    const mockReq = { params: { productId: mockProduct._id } }
    const productInstance = await productController.findProductById(mockReq, {})
    expect(productInstance).toStrictEqual(mockProduct)
  })

  test('Should return boom 400 because of fakeId', async () => {
    const mockReq = { params: { productId: new mongoose.Types.ObjectId() } }
    const result = await productController.findProductById(mockReq, {})
    expect(isBoom(result, 400)).toBe(true)
  })

  test('Should return all options of product', async () => {
    const mockReq = { params: { productId: mockProduct._id } }
    const optionList = await productController.findAllOptionsOfProduct(mockReq, {})
    expect(mockOptionsOfProduct).toIncludeSameMembers(optionList)
  })

  test('Should return boom 400 because of fakeId when finding options of product', async () => {
    const mockReq = { params: { productId: new mongoose.Types.ObjectId() } }
    const result = await productController.findAllOptionsOfProduct(mockReq, {})
    expect(isBoom(result, 400)).toBe(true)
  })
})
