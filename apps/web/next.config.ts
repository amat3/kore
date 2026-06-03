import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // lottie-react usa require() internamente — excluir del bundle SSR
  serverExternalPackages: ['lottie-react'],
}

export default nextConfig
