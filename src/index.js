'use strict'

import Hapi from '@hapi/hapi'
import routes from './routes'
import plugins from './plugins'
import config from './config'
import { connectMongo } from './mongodb'
import moment from 'moment'
import debug from './utils/debug.utils'
import { findUserById } from './services/user.service'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'

const appNAMESPACE = `APP-${moment.utc().toISOString()}`
const dbNAMESPACE = `DATABASE-${moment.utc().toISOString()}`

const init = async () => {
  const server = Hapi.server({
    port: config.PORT,
    host: config.HOST
  })

  try {
    await connectMongo()
  }
  catch (err) {
    debug.error(dbNAMESPACE, 'ERROR: An error happened whilst connecting to mongodb', err)
    process.exit(1)
  }

  await server.register(plugins)
  server.auth.strategy(config.JWT_BEARER_TOKEN_AUTHORIZATION, 'bearer-access-token', {
    validate: async (request, token, h) => {
      let isValid = false
      let credentials = {}
      let userId = null

      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          return Boom.unauthorized(`${err.message}`)
        }
        userId = decoded.userId
      })
      const userInstance = await findUserById(userId)

      if (userInstance) {
        isValid = true
        credentials = { user: userInstance, token }
      }
      return { isValid, credentials, artifacts: {} }
    }
  })

  await server.route(routes)

  server.events.on('start', () => {
    debug.log(appNAMESPACE, 'INFO: Server running on %s', server.info.uri)
  })
  await server.start()

  server.events.on('response', function (request) {
    debug.log(
      request.info.remoteAddress + ': ' +
      request.method.toUpperCase() + ' ' +
      request.url.pathname + ' --> ' +
      request.response.statusCode)
  })
}

process.on('unhandledRejection', (err) => {
  debug.error(err.message)
  process.exit(1)
})

init()
