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
      required: [true, 'price is required']
    },
    rate: {
      type: String,
      required: [true, 'rate is required']
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
  }
);

const Model = mongoose.model('Product', productSchema)

export default Model
