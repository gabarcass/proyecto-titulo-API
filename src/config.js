var mysql      = require('mysql');
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    mysql:{
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'babycontrol'
    },
  },
  test: { },
  development: { },
  production: {  }

}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
