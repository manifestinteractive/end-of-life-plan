const version = require('../../../package.json').version
const date = new Date()

module.exports = {
  assetPath: 'assets/',
  cacheBreak: (process.env.NODE_ENV === 'production') ? '' : `?ac${new Date().getTime()}`,
  currentYear: date.getFullYear(),
  currentDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  env: process.env.NODE_ENV,
  robots: 'noindex,nofollow',
  version: version
}
