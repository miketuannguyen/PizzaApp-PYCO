import categoryModel from '../models/category.model'
import moment from 'moment'
import debug from '../utils/debug.utils'

const NAMESPACE = `categoryRepository-${moment.utc().toISOString()}`

export const findAll = async () => {
  try {
    return await categoryModel.find({})
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}

export const findCategoryById = async (categoryId) => {
  try {
    return await categoryModel.findById(categoryId)
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
