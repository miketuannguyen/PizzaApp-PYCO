import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
//import { mongoUri } from '../src/config/index'

const mongoMemory = new MongoMemoryServer()

export const connect = async () => {
  const uri = await mongoMemory.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoMemory.stop();
}

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
