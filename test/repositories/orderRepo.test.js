import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as orderRepo from '../../src/repositories/order.repo'
import userModel from '../../src/models/user.model'
import mongoose from 'mongoose'

const chance = require('chance').Chance()

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Order repository unit tests', () => {
  test('Should return order after creating', async () => {
    const mockUser = {
      phone: faker.phone.phoneNumber(),
      password: faker.random.word(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
    }

    const mockOrder = {
      orderLineArray: [{
        product: new mongoose.Types.ObjectId(),
        optionArray: [{
          _id: new mongoose.Types.ObjectId(),
          title: faker.random.words(),
          price: chance.integer({ min: 1, max: 3 }),
          type: faker.random.words(),
          product: new mongoose.Types.ObjectId()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: faker.random.words(),
          price: chance.integer({ min: 1, max: 3 }),
          type: faker.random.words(),
          product: new mongoose.Types.ObjectId()
        }],
        quantity: chance.integer({ min: 1, max: 3 })
      }, {
        product: new mongoose.Types.ObjectId(),
        optionArray: [{
          _id: new mongoose.Types.ObjectId(),
          title: faker.random.words(),
          price: chance.integer({ min: 1, max: 3 }),
          type: faker.random.words(),
          product: new mongoose.Types.ObjectId()
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: faker.random.words(),
          price: chance.integer({ min: 1, max: 3 }),
          type: faker.random.words(),
          product: new mongoose.Types.ObjectId()
        }],
        quantity: chance.integer({ min: 1, max: 3 })
      }],
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country(),
      totalPrice: chance.integer({ min: 0, max: 50 }),
      paymentMethod: faker.lorem.word()
    }

    const userInstance = await userModel.create({ ...mockUser })

    const orderInstance = await orderRepo.createOrder(userInstance._id, mockOrder)
    const castedOrderInstance = orderInstance.toObject()
    expect(castedOrderInstance._id).toBeDefined()
    expect(castedOrderInstance.user).toStrictEqual(userInstance._id)
    expect(castedOrderInstance.orderLineArray).toStrictEqual(mockOrder.orderLineArray)
    expect(castedOrderInstance.phone).toBe(mockOrder.phone)
    expect(castedOrderInstance.name).toBe(mockOrder.name)
    expect(castedOrderInstance.address).toBe(mockOrder.address)
    expect(castedOrderInstance.totalPrice).toBe(mockOrder.totalPrice)
  })
})
