import faker from 'faker'
import * as dbHandler from '../mongoMemoryHandler'
import * as orderController from '../../src/controllers/order.controller'
import mongoose from 'mongoose'
import userModel from '../../src/models/user.model'
import productModel from '../../src/models/product.model'
import optionModel from '../../src/models/option.model'
import { isBoom } from '@hapi/boom'

const chance = require('chance').Chance()

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const mockUser = {
  _id: new mongoose.Types.ObjectId(),
  phone: faker.phone.phoneNumber(),
  password: faker.random.word(),
  name: faker.name.findName(),
  address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
}

const mockProducts = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: new mongoose.Types.ObjectId() 
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 15 }),
  rate: chance.floating({ min: 0, max: 5, fixed: 1 }),
  imageUrl: faker.image.imageUrl(),
  category: new mongoose.Types.ObjectId()
}]

const mockOptionsOfProduct = [{
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProducts[0]._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProducts[0]._id
}, {
  _id: new mongoose.Types.ObjectId(),
  title: faker.lorem.sentence(),
  price: chance.integer({ min: 0, max: 1 }),
  type: faker.random.word(),
  product: mockProducts[1]._id
}]

describe('Order controller unit tests', () => {
  test('Should return order after creating', async () => {
    const mockOrderPayload = {
      orderLineArray: [{
        product: mockProducts[0]._id,
        optionArray: [mockOptionsOfProduct[0]._id, mockOptionsOfProduct[1]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }, {
        product: mockProducts[1]._id,
        optionArray: [mockOptionsOfProduct[2]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }],
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country(),
      note: faker.lorem.sentence()
    }

    const mockReq = {
      payload: mockOrderPayload,
      auth: {
        credentials: { user: mockUser }
      }
    }

    const testTotalPrice = (
      mockOptionsOfProduct[0].price +
      mockOptionsOfProduct[1].price +
      mockProducts[0].price
    ) * mockOrderPayload.orderLineArray[0].quantity + (
      mockOptionsOfProduct[2].price +
      mockProducts[1].price
    ) * mockOrderPayload.orderLineArray[1].quantity

    await userModel.create({ ...mockUser })
    await productModel.insertMany(mockProducts)
    await optionModel.insertMany(mockOptionsOfProduct)
    const resultRes = await orderController.createCODOrder(mockReq, {})
    const castedRes = resultRes.toObject()
    expect(castedRes._id).toBeDefined()
    expect(castedRes.user).toStrictEqual(mockUser._id)
    expect(castedRes.orderLineArray).toStrictEqual(mockOrderPayload.orderLineArray)
    expect(castedRes.phone).toBe(mockOrderPayload.phone)
    expect(castedRes.name).toBe(mockOrderPayload.name)
    expect(castedRes.address).toBe(mockOrderPayload.address)
    expect(castedRes.totalPrice).toBe(testTotalPrice)
    expect(castedRes.note).toBe(mockOrderPayload.note)
    expect(castedRes.createdAt).toBeDefined()
  })

  test('Should return boom 400 because 1 product in 1 orderLine does not exist', async () => {
    const mockOrderPayload = {
      orderLineArray: [{
        product: new mongoose.Types.ObjectId(),
        optionArray: [mockOptionsOfProduct[0]._id, mockOptionsOfProduct[1]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }, {
        product: mockProducts[1]._id,
        optionArray: [mockOptionsOfProduct[2]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }],
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country(),
      note: faker.lorem.sentence()
    }

    const mockReq = {
      payload: mockOrderPayload,
      auth: {
        credentials: { user: mockUser }
      }
    }

    await userModel.create({ ...mockUser })
    await productModel.insertMany(mockProducts)
    await optionModel.insertMany(mockOptionsOfProduct)
    const resultRes = await orderController.createCODOrder(mockReq, {})
    expect(isBoom(resultRes, 400)).toBe(true)
  })

  test('Should return boom 400 because 1 option in 1 optionArray does not exist', async () => {
    const mockOrderPayload = {
      orderLineArray: [{
        product: mockProducts[0]._id,
        optionArray: [new mongoose.Types.ObjectId(), mockOptionsOfProduct[1]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }, {
        product: mockProducts[1]._id,
        optionArray: [mockOptionsOfProduct[2]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }],
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country(),
      note: faker.lorem.sentence()
    }

    const mockReq = {
      payload: mockOrderPayload,
      auth: {
        credentials: { user: mockUser }
      }
    }

    await userModel.create({ ...mockUser })
    await productModel.insertMany(mockProducts)
    await optionModel.insertMany(mockOptionsOfProduct)
    const resultRes = await orderController.createCODOrder(mockReq, {})
    expect(isBoom(resultRes, 400)).toBe(true)
  })
  
  test('Should return boom 400 because 1 option does not belong to the product in that orderLine', async () => {
    const mockOrderPayload = {
      orderLineArray: [{
        product: mockProducts[0]._id,
        optionArray: [mockOptionsOfProduct[0]._id, mockOptionsOfProduct[1]._id],
        quantity: chance.integer({ min: 1, max: 3 })
      }, {
        product: mockProducts[1]._id,
        optionArray: [mockOptionsOfProduct[0]._id],
        //mockOptionsOfProduct 0 does not belong to mockProducts 1
        quantity: chance.integer({ min: 1, max: 3 })
      }],
      phone: faker.phone.phoneNumber(),
      name: faker.name.findName(),
      address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country(),
      note: faker.lorem.sentence()
    }

    const mockReq = {
      payload: mockOrderPayload,
      auth: {
        credentials: { user: mockUser }
      }
    }

    await userModel.create({ ...mockUser })
    await productModel.insertMany(mockProducts)
    await optionModel.insertMany(mockOptionsOfProduct)
    const resultRes = await orderController.createCODOrder(mockReq, {})
    expect(isBoom(resultRes, 400)).toBe(true)
  })
})
