import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: 0
    },
    type: {
      type: String,
      required: [true, 'type is required']
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  { versionKey: false }
);

const Model = mongoose.model('Option', optionSchema)

export default Model
