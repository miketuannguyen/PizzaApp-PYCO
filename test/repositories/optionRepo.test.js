import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as optionRepo from '../../src/repositories/option.repo'
import optionModel from '../../src/models/option.model'
import productModel from '../../src/models/product.model'
import mongoose from 'mongoose'

const chance = require('chance').Chance()

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Option repository unit tests', () => {
  test('Should return all options of product', async () => {
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

    await productModel.create(mockProduct)
    await optionModel.insertMany(mockOptionsOfProduct)

    const optionList = await optionRepo.findAllOptionsOfProduct(mockProduct._id)
    const castedOptionList = optionList.map((opt) => opt.toObject())
    expect(mockOptionsOfProduct).toIncludeSameMembers(castedOptionList);
  })
})
