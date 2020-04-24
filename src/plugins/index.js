import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'
import config from '../config'

export default [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      basePath: config.basePath,
      info: {
        title: config.pkg.name,
        version: config.pkg.version
      },
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  }
];
