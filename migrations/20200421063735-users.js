const { userIds } = require('../mongoObjectIdSeeds')
const debug = require('../src/utils/debug.utils')
const faker = require('faker')

module.exports = {
  async up(db, client) {
    try {
      await db.collection('users').insertMany([{
        _id: userIds[0],
        phone: '0903593963',
        password: '$2a$08$2UdW9lFdKV3LphhZMVaAROibklNye9639kodWYa5uLG9wMI0GOVeK', //password hashed from 123456789
        address: faker.address.streetAddress() + ' ' + faker.address.streetName() + ' ' + faker.address.country()
      }])
    }
    catch (err) {
      debug.error(err)
    }
  },

  async down(db, client) {
    try {
      await db.collection('users').drop()
    }
    catch (err) {
      debug.error(err)
    }
  }
};
