const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = function (phase, { defaultConfig }) {
  const common = {
    // GitHub Pages requires trailing slashes
    trailingSlash: true,
    // Output directory
    distDir: 'out',
    // Disable TypeScript type checking
    typescript: {
      ignoreBuildErrors: true,
    },
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
    return { ...common }
  }
}
