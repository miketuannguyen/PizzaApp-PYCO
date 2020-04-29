const path = require('path')
const dotenv = require('dotenv')
const pkg = require('./../../package.json')

const envRootPath = path.resolve(process.cwd(), '.env');
const config = {};

config.path = `${envRootPath}`;

dotenv.config(config);

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  MONGO_URI: process.env.MONGO_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRED_TIME: process.env.TOKEN_EXPIRED_TIME,
  JWT_BEARER_TOKEN_AUTHENTICATION: 'JWT Bearer Token Authorization',
  pkg
};
