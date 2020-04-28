import * as dbHandler from '../mongoMemoryHandler'
import faker from 'faker'
import * as userRepo from '../../src/repositories/user.repo'
import crypt from '../../src/utils/crypt.utils'

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
  await dbHandler.clearDatabase()
  await dbHandler.closeDatabase()
});

const mockUser = {
  phone: faker.phone.phoneNumber(),
  password: faker.random.word(),
  name: faker.name.findName(),
  address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
}

let userInstance

describe('User repository unit tests', () => {
  test('Should return user with info matching with mock user and having valid password after creating', async () => {
    userInstance = await userRepo.createUser(mockUser)
    expect(userInstance._id).toBeDefined()
    expect(userInstance.phone).toBe(mockUser.phone)
    expect(userInstance.name).toBe(mockUser.name)
    expect(userInstance.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockUser.password, userInstance.password)).toBe(true)
  })

  test('Should return user with valid info after finding by phone', async () => {
    const userResult = await userRepo.findByPhone(userInstance.phone)
    expect(userResult._id).toBeDefined()
    expect(userResult.phone).toBe(mockUser.phone)
    expect(userResult.name).toBe(mockUser.name)
    expect(userResult.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockUser.password, userResult.password)).toBe(true)
  })

  test('Should return user with valid info after finding by id', async () => {
    const userResult = await userRepo.findById(userInstance._id)
    expect(userResult._id).toBeDefined()
    expect(userResult.phone).toBe(mockUser.phone)
    expect(userResult.name).toBe(mockUser.name)
    expect(userResult.address).toBe(mockUser.address)
    expect(crypt.comparePassword(mockUser.password, userResult.password)).toBe(true)
  })
})
