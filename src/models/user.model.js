import mongoose from 'mongoose'
import crypt from '../utils/crypt.utils'

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, 'phone is required']
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    name: {
      type: String,
      required: [true, 'name is required']
    },
    address: {
      type: String,
      required: [true, 'address is required']
    }
  },
  { versionKey: false }
);

userSchema.methods.validPassword = function (password) {
  return crypt.comparePassword(password, this.password)
}

userSchema.pre('save', async function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  //return next() will make sure the rest of this function doesn't run

  const userPassword = user.password
  user.password = await crypt.hashPassword(userPassword)
  next()
})

const Model = mongoose.model('User', userSchema)

export default Model
