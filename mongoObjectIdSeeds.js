const mongoose = require('mongoose')

const categoryIds = []
const productIds = []
const userIds = []

const init = () => {
  for (let i = 0; i < 5; i++) {
    const cateId = new mongoose.Types.ObjectId()
    categoryIds.push(cateId)
  }

  for (let i = 0; i < 27; i++) {
    const productId = new mongoose.Types.ObjectId()
    productIds.push(productId)
  }

  for (let i = 0; i < 1; i++) {
    const userId = new mongoose.Types.ObjectId()
    userIds.push(userId)
  }
}

init()

module.exports = { categoryIds, productIds, userIds }
