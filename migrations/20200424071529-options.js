const debug = require('../src/utils/debug.utils')
const { optionIds, productIds } = require('../mongoObjectIdSeeds')

module.exports = {
  async up(db, client) {
    try {
      await db.collection('options').insertMany([{
        _id: optionIds[0],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[0]
      }, {
        _id: optionIds[1],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[0]
      }, {
        _id: optionIds[2],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[1]
      }, {
        _id: optionIds[3],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[1]
      }, {
        _id: optionIds[4],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[2]
      }, {
        _id: optionIds[5],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[2]
      }, {
        _id: optionIds[6],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[3]
      }, {
        _id: optionIds[7],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[3]
      }, {
        _id: optionIds[8],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[4]
      }, {
        _id: optionIds[9],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[4]
      }, {
        _id: optionIds[10],
        title: 'Size M',
        price: 1,
        type: 'Size',
        product: productIds[5]
      }, {
        _id: optionIds[11],
        title: 'Size L',
        price: 2,
        type: 'Size',
        product: productIds[5]
      }, {
        _id: optionIds[12],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[0]
      }, {
        _id: optionIds[13],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[0]
      }, {
        _id: optionIds[14],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[1]
      }, {
        _id: optionIds[15],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[1]
      }, {
        _id: optionIds[16],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[2]
      }, {
        _id: optionIds[17],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[2]
      }, {
        _id: optionIds[18],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[3]
      }, {
        _id: optionIds[19],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[3]
      }, {
        _id: optionIds[20],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[4]
      }, {
        _id: optionIds[21],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[4]
      }, {
        _id: optionIds[22],
        title: 'Thin Crust',
        price: 1,
        type: 'Crust',
        product: productIds[5]
      }, {
        _id: optionIds[23],
        title: 'Thick Crust',
        price: 2,
        type: 'Crust',
        product: productIds[5]
      }, {
        _id: optionIds[24],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[0]
      }, {
        _id: optionIds[25],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[0]
      }, {
        _id: optionIds[26],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[1]
      }, {
        _id: optionIds[27],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[1]
      }, {
        _id: optionIds[28],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[2]
      }, {
        _id: optionIds[29],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[2]
      }, {
        _id: optionIds[30],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[3]
      }, {
        _id: optionIds[31],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[3]
      }, {
        _id: optionIds[32],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[4]
      }, {
        _id: optionIds[33],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[4]
      }, {
        _id: optionIds[34],
        title: 'Sausage',
        price: 1,
        type: 'Topping',
        product: productIds[5]
      }, {
        _id: optionIds[35],
        title: 'Shrimp',
        price: 2,
        type: 'Topping',
        product: productIds[5]
      }])
    }
    catch (err) {
      debug.error(err)
    }
  },

  async down(db, client) {
    try {
      await db.collection('options').drop()
    }
    catch (err) {
      debug.error(err)
    }
  }
};
