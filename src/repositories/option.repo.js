import optionModel from '../models/option.model'
import moment from 'moment'
import debug from '../utils/debug.utils'

const NAMESPACE = `optionRepository-${moment.utc().toISOString()}`

export const findAllOptionsOfProduct = async (productId) => {
  try {
    return await optionModel.find({ product: productId })
  }
  catch (err) {
    debug.error(NAMESPACE, '', err)
    throw err
  }
}
