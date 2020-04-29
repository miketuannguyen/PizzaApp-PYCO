import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'
import config from '../config'
import AuthBearer from 'hapi-auth-bearer-token'

export default [
  AuthBearer,
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: config.pkg.name,
        version: config.pkg.version
      },
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: config.JWT_BEARER_TOKEN_AUTHENTICATION,
          in: 'header'
        }
      }
    }
  }
];
