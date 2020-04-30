import faker from 'faker'
import * as orderController from '../../src/controllers/order.controller'
import mongoose from 'mongoose'

const chance = require('chance').Chance()

const mockUser = {
  _id: new mongoose.Types.ObjectId(),
  phone: faker.phone.phoneNumber(),
  password: faker.random.word(),
  name: faker.name.findName(),
  address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
}

const mockOrder = {
  _id: new mongoose.Types.ObjectId(),
  user: mockUser._id,
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

jest.mock('../../src/services/order.service', () => ({
  createCODOrder: () => mockOrder
}))

describe('Order repository unit tests', () => {
  test('Should return order after creating', async () => {
    const mockReq = {
      payload: mockOrder,
      auth: {
        credentials: { user: mockUser }
      }
    }

    const resultRes = await orderController.createCODOrder(mockReq, {})
    expect(resultRes._id).toBeDefined()
    expect(resultRes.user).toStrictEqual(mockUser._id)
    expect(resultRes.orderLineArray).toStrictEqual(mockOrder.orderLineArray)
    expect(resultRes.phone).toBe(mockOrder.phone)
    expect(resultRes.name).toBe(mockOrder.name)
    expect(resultRes.address).toBe(mockOrder.address)
    expect(resultRes.totalPrice).toBe(mockOrder.totalPrice)
  })
})
