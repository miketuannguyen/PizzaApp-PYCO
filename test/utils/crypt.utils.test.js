import crypt from '../../src/utils/crypt.utils'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../src/config/index'
import faker from 'faker'

describe('Utilities unit tests', () => {
  test('Should return true because password is valid', async () => {
    const fakeString = faker.internet.password()
    const hashedPass = await crypt.hashPassword(fakeString)
    expect(crypt.comparePassword(fakeString, hashedPass)).toBe(true)
  })

  test('Should return false because password is invalid', async () => {
    const fakeString = faker.internet.password()
    const secondFakeString = faker.internet.password()
    const hashedPass = await crypt.hashPassword(fakeString)
    expect(crypt.comparePassword(secondFakeString, hashedPass)).toBe(false)
  })

  test('Should return true because id decrypted from token matches with previous id', () => {
    const mongooseID = faker.random.uuid()
    const authToken = crypt.createAuthToken(mongooseID)
    const { id } = jwt.verify(authToken, JWT_SECRET)
    expect(id).toBe(mongooseID)
  })

})
