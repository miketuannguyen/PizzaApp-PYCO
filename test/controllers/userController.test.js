import * as dbHandler from '../mongoMemoryHandler'
import * as userController from '../../src/controllers/user.controller'
import faker from 'faker'
import crypt from '../../src/utils/crypt.utils'
import { isBoom } from '@hapi/boom'

const mockPassword = faker.random.word()

const mockUser = {
  phone: faker.phone.phoneNumber(),
  password: mockPassword,
  name: faker.name.findName(),
  address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
}

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
  await dbHandler.clearDatabase()
  await dbHandler.closeDatabase()
});

let userInstance

describe('User controller unit tests', () => {
  test('Should return user info after registering', async () => {
    const mockReq = { payload: mockUser }
    userInstance = await userController.register(mockReq, {})
    expect(userInstance._id).toBeDefined()
    expect(userInstance.phone).toBe(mockUser.phone)
    expect(userInstance.name).toBe(mockUser.name)
    expect(userInstance.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockPassword, userInstance.password)).toBe(true)
  })

  test('Should return 400 bad request boom after registering because phone was used', async () => {
    const mockReq = { payload: mockUser }
    const result = await userController.register(mockReq, {})
    expect(isBoom(result, 400)).toBe(true)
  })

  test('Should return user info and token after login', async () => {
    const mockReq = { payload: { phone: mockUser.phone, password: mockUser.password } }
    const result = await userController.login(mockReq, {})
    expect(result.user._id).toBeDefined()
    expect(result.user.phone).toBe(mockUser.phone)
    expect(result.user.name).toBe(mockUser.name)
    expect(result.user.address).toBe(mockUser.address)
    expect(result.token).toBeDefined()
  })

  test('Should return 400 bad request boom after login because phone was not registered', async () => {
    const mockReq = { payload: { phone: mockUser.phone, password: faker.random.word() } }
    const result = await userController.login(mockReq, {})
    expect(isBoom(result, 401)).toBe(true)
  })
})
