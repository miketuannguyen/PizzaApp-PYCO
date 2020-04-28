import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl is required']
    }
  },
  { versionKey: false }
);

const Model = mongoose.model('Category', categorySchema)

export default Model
