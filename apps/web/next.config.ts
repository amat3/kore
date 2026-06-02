import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Turbopack production no resuelve CSS exports de packages en monorepo — bypass explícito
      '@kore/tokens/css': path.resolve(__dirname, '../../packages/tokens/dist/kore.css'),
    },
  },
}

export default nextConfig
