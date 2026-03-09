import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker deployment
  output: 'standalone',
  
  // Disable telemetry for faster startup
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize for development
  experimental: {
    webpackMemoryOptimizations: true,
  },
  
  // Your Next.js config here
  webpack: (webpackConfig, { dev }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Optimize for faster development builds
    if (dev) {
      webpackConfig.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
