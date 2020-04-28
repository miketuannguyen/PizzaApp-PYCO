const { databaseName } = require('./src/config/index.js')

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: databaseName
    },
    binary: {
      version: 'latest',
      skipMD5: true
    },
    autoStart: false
  }
}
