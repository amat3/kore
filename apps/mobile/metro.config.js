const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const projectRoot   = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Monorepo: watch packages y node_modules hoisted del root
// (no el workspaceRoot completo — es padre de projectRoot y confunde a Metro)
config.watchFolders = [
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'packages'),
]

// Resolver busca primero en app/mobile, luego en root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

module.exports = config
