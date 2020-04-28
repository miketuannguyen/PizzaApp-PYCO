import * as dbHandler from '../mongoMemoryHandler'
import * as userService from '../../src/services/user.service'
import faker from 'faker'
import crypt from '../../src/utils/crypt.utils'

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

describe('User service unit tests', () => {
  test('Should return user after creating', async () => {
    userInstance = await userService.createUser(mockUser)
    expect(userInstance._id).toBeDefined()
    expect(userInstance.phone).toBe(mockUser.phone)
    expect(userInstance.name).toBe(mockUser.name)
    expect(userInstance.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockPassword, userInstance.password)).toBe(true)
  })

  test('Should return user after finding by phone', async () => {
    const userResult = await userService.findByPhone(mockUser.phone)
    expect(userResult._id).toBeDefined()
    expect(userResult.phone).toBe(mockUser.phone)
    expect(userResult.name).toBe(mockUser.name)
    expect(userResult.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockPassword, userResult.password)).toBe(true)
  })

  test('Should return user after finding by id', async () => {
    const userResult = await userService.findById(userInstance._id)
    expect(userResult._id).toBeDefined()
    expect(userResult.phone).toBe(mockUser.phone)
    expect(userResult.name).toBe(mockUser.name)
    expect(userResult.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockPassword, userResult.password)).toBe(true)
  })

  test('Should return user after authenticating', async () => {
    const userResult = await userService.authenticate(mockUser.phone, mockPassword)
    expect(userResult._id).toBeDefined()
    expect(userResult.phone).toBe(mockUser.phone)
    expect(userResult.name).toBe(mockUser.name)
    expect(userResult.address).toBe(mockUser.address)
    expect(userResult.password).toBeUndefined()
  })

  test('Should return null after authenticating because invalid password', async () => {
    const userResult = await userService.authenticate(mockUser.phone, faker.random.word())
    expect(userResult).toBeNull()
  })
})
