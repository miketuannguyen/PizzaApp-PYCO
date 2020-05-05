import mongoose from 'mongoose'
import { optionSchema } from './option.model'

const orderLineSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    optionArray: [optionSchema],
    quantity: {
      type: Number,
      required: [true, 'quantity is required'],
      min: 0
    }
  }, {
    versionKey: false,
    _id: false
  }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderLineArray: {
      type: [orderLineSchema],
      required: [true, 'orderLineArray is required']
    },
    phone: {
      type: String,
      required: [true, 'phone is required']
    },
    name: {
      type: String,
      required: [true, 'name is required']
    },
    address: {
      type: String,
      required: [true, 'address is required']
    },
    totalPrice: {
      type: Number,
      required: [true, 'totalPrice is required'],
      min: 0
    },
    paymentMethod: {
      type: String,
      required: [true, 'paymentMethod is required']
    },
    note: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
)

const Model = mongoose.model('Order', orderSchema)

export default Model
