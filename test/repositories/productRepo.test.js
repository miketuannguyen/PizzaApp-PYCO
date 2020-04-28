import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as productRepo from '../../src/repositories/product.repo'
import productModel from '../../src/models/product.model'
import cateModel from '../../src/models/category.model'
import mongoose from 'mongoose'

const chance = require('chance').Chance()

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Product repository unit tests', () => {
  test('Should return all products of category', async () => {
    const mockCategory = {
      _id: new mongoose.Types.ObjectId(),
      title: faker.lorem.sentence(),
      imageUrl: faker.image.imageUrl()
    }

    const mockProductOfCategory = [{
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

    await cateModel.create(mockCategory)
    await productModel.insertMany(mockProductOfCategory)

    const productList = await productRepo.findAllProductsOfCategory(mockCategory._id)
    const castedProductList = productList.map((prod) => prod.toObject())
    expect(mockProductOfCategory).toIncludeSameMembers(castedProductList);
  })

  test('Should return product match with mock product', async () => {
    const mockProduct = {
      _id: new mongoose.Types.ObjectId(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      price: chance.integer({ min: 0, max: 15 }),
      rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
      imageUrl: faker.image.imageUrl(),
      category: new mongoose.Types.ObjectId()
    }

    await productModel.create(mockProduct)
    const productInstance = await productRepo.findProductById(mockProduct._id)
    expect(productInstance.toObject()).toStrictEqual(mockProduct)
  })
})
