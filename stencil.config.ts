import { Config } from '@stencil/core'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

export const config: Config = {
  namespace: 'mycomponent',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [builtins(), globals()],
  nodeResolve: {
    browser: true,
    preferBuiltins: true // Workaround for https://github.com/ionic-team/stencil/issues/1326
  }
}
