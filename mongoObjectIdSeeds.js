const mongoose = require('mongoose')

const categoryIds = []
const productIds = []

const init = () => {
  for (let i = 0; i < 5; i++) {
    const cateId = new mongoose.Types.ObjectId()
    categoryIds.push(cateId)
  }

  for (let i = 0; i < 30; i++) {
    const productId = new mongoose.Types.ObjectId()
    productIds.push(productId)
  }
}

init()

module.exports = { categoryIds, productIds }
