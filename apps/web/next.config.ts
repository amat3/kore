import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Turbopack production no resuelve CSS exports de packages en monorepo — ruta relativa
      '@kore/tokens/css': '../../packages/tokens/dist/kore.css',
    },
  },
}

export default nextConfig
