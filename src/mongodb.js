import mongoose from 'mongoose'
import debug from './utils/debug.utils'
import config from './config'
import moment from 'moment'

const NAMESPACE = `DATABASE-${moment.utc().toISOString()}`

export const connectMongo = async () => {
  mongoose.Promise = global.Promise;

  await mongoose.connect(config.mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 10
  }, err => {
    if (err) {
      throw err
    }
    else {
      debug.log(NAMESPACE, 'INFO: Connect to mongodb successfully.');
    }
  });
};

export const disconnectMongo = done => {
  mongoose.disconnect(done);
};
