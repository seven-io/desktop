import type {ConfigEnv, UserConfig} from 'vite'
import {defineConfig, mergeConfig} from 'vite'
import {external, getBuildConfig, pluginHotRestart} from './vite.base.config'

// https://vitejs.dev/config
export default defineConfig((env) => {
    const forgeEnv = env as ConfigEnv<'build'>
    const {forgeConfigSelf} = forgeEnv
    const config: UserConfig = {
        build: {
            rollupOptions: {
                external,
                input: forgeConfigSelf.entry!, // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
                output: {
                    assetFileNames: '[name].[ext]',
                    chunkFileNames: '[name].js',
                    entryFileNames: '[name].js',
                    format: 'cjs',
                    inlineDynamicImports: true, // It should not be split chunks.
                },
            },
        },
        plugins: [pluginHotRestart('reload')],
    }

    return mergeConfig(getBuildConfig(forgeEnv), config)
})
