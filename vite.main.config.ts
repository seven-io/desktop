import type {ConfigEnv, UserConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {external, getBuildConfig, getBuildDefine, pluginHotRestart} from './vite.base.config'

export default defineConfig(env => { // https://vitejs.dev/config
    // @ts-ignore
    const forgeEnv = env as ConfigEnv<'build'>
    const {forgeConfigSelf} = forgeEnv
    const define = getBuildDefine(forgeEnv)
    const config: UserConfig = {
        build: {
            lib: {
                entry: forgeConfigSelf.entry!,
                fileName: () => '[name].js',
                formats: ['cjs'],
            },
            rollupOptions: {
                external,
            },
        },
        plugins: [pluginHotRestart('restart')],
        define,
        resolve: {
            // Load the Node.js entry.
            mainFields: ['module', 'jsnext:main', 'jsnext'],
        },
    }

    return mergeConfig(getBuildConfig(forgeEnv), config)
})
