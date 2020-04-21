const config = require('./src/config')

const mongoConfig = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: config.mongoUri,

    // TODO Change this to your database name:
    databaseName: config.databaseName,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true // removes a deprecating warning when connecting
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog'
};

// Return the config as a promise
module.exports = mongoConfig;
