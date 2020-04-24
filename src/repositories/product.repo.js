import productModel from '../models/product.model'
import moment from 'moment'
import debug from '../utils/debug.utils'

const NAMESPACE = `productRepository-${moment.utc().toISOString()}`

export const findAllProductsOfCategory = async (categoryId) => {
  try {
    return await productModel.find({ category: categoryId })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findProductById = async (productId) => {
  try {
    return await productModel.findById(productId)
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
