import { defineConfig } from 'tsup'

export default defineConfig({
  entry:     ['src/index.ts'],
  format:    ['cjs', 'esm'],
  dts:       true,
  clean:     true,
  sourcemap: true,
  external:  ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
})
