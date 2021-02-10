const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = function (phase, { defaultConfig }) {
  // phase is the current context in which the configuration is loaded
  // https://github.com/vercel/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4
  // all available config, check official doc as below url
  // https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/config.ts
  
  const common = {}
  common.rewrites = async function rewrites () {
    return [
      {
        source: '/home',
        destination: '/',
      }
    ]
  }
  
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // DEV mode config
    return {
      ...common
    }
  } else {
    // PROD mode config
    return {
      ...common
    }
  }
}
