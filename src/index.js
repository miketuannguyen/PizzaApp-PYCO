'use strict'

import Hapi from '@hapi/hapi'
import routes from './routes'
import plugins from './plugins'
import config from './config'
import { connectMongo } from './mongodb'
import moment from 'moment'
import debug from './utils/debug.utils'

const appNAMESPACE = `APP-${moment.utc().toISOString()}`
const dbNAMESPACE = `DATABASE-${moment.utc().toISOString()}`
let server

const init = async () => {
  server = Hapi.server({
    port: config.port,
    host: config.host
  })

  try {
    await connectMongo()
  }
  catch (err) {
    debug.error(dbNAMESPACE, 'ERROR: An error happened whilst connecting to mongodb', err)
    process.exit(1)
  }

  await server.route(routes)
  await server.register(plugins)

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
