import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    { file: './lib/index.es.js', format: 'es' },
    { file: './lib/index.cjs', format: 'cjs' }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: "tsconfig.json",
      verbosity: 3,
      check: true,
    }),
  ],
}

