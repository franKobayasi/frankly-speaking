const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = function (phase, { defaultConfig }) {
  // Enable static export for GitHub Pages
  const config = {
    // Static export for GitHub Pages
    output: 'export',
    // Explicitly disable SWC to avoid binary download issues on CI
    swcMinify: false,
    // GitHub Pages requires trailing slashes
    trailingSlash: true,
    // Output directory
    distDir: 'out',
    // Disable TypeScript type checking
    typescript: {
      ignoreBuildErrors: true,
    },
    // Disable ESLint during build
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Required for next/image with static export
    images: {
      unoptimized: true,
    },
    // Ensure server-only modules don't leak to client
    webpack: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
      }
      return webpackConfig
    },
  }

  // Only enable rewrites in development (not supported in static export)
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config.rewrites = async function rewrites() {
      return [
        {
          source: '/home',
          destination: '/',
        }
      ]
    }
  }

  return config
}
