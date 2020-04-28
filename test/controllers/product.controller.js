import faker from 'faker'
import * as productController from '../../src/controllers/product.controller'
import mongoose from 'mongoose'

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

jest.mock('../../src/services/product.service', () => ({
  findProductById: () => mockProduct
}))

describe('Product controller unit tests', () => {
  test('Should return product with _id match with mock _id', async () => {
    const productInstance = await productController.findProductById(mockProduct._id)
    expect(productInstance).toStrictEqual(mockProduct)
  })
})
