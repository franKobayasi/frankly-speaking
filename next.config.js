const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const path = require('path')

module.exports = function (phase, { defaultConfig }) {
  const common = {
    // GitHub Pages requires trailing slashes
    trailingSlash: true,
    // Output directory for static export
    distDir: 'out',
  }

  common.rewrites = async function rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      }
    ]
  }

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return { ...common }
  } else {
    return {
      ...common,
      // GitHub Pages works better without server-side features
      webpack: (config) => {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        }
        return config
      },
    }
  }
}
