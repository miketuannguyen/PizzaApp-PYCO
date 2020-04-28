// import { MongoClient } from 'mongodb'
// import { mongoUri } from '../../src/config/index'
import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as categoryRepo from '../../src/repositories/category.repo'
import cateModel from '../../src/models/category.model'
import mongoose from 'mongoose'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('Category repository unit tests', () => {
  // let connection
  // let db

  // beforeAll(async () => {
  //   connection = await MongoClient.connect(mongoUri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  //   db = await connection.db()
  // })

  // afterAll(async () => {
  //   await connection.close()
  //   await db.close()
  // })

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

    const categoryList = await categoryRepo.findAll({})
    expect(categoryList).toIncludeAnyMembers(mockCategories);
  })
})
