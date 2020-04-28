import faker from 'faker'
import * as optionService from '../../src/services/option.service'
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

jest.mock('../../src/repositories/option.repo', () => ({
  findAllOptionsOfProduct: () => mockOptionsOfProduct
}))

describe('Option service unit tests', () => {
  test('Should return all products of category', async () => {
    const optionList = await optionService.findAllOptionsOfProduct(mockProduct._id)
    expect(mockOptionsOfProduct).toIncludeSameMembers(optionList);
  })
})
