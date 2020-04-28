import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as categoryRepo from '../../src/repositories/category.repo'
import cateModel from '../../src/models/category.model'
import mongoose from 'mongoose'

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Category repository unit tests', () => {
  test('Should return all categories', async () => {
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

    await cateModel.insertMany(mockCategories)

    const categoryList = await categoryRepo.findAll()
    const castedCategoryList = categoryList.map((cate) => cate.toObject())
    expect(mockCategories).toIncludeSameMembers(castedCategoryList);
  })
})
