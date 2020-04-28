import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: 0
    },
    rate: {
      type: Number,
      required: [true, 'rate is required'],
      min: 0,
      max: 5
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl is required']
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { versionKey: false }
);

const Model = mongoose.model('Product', productSchema)

export default Model
