import type {ConfigEnv, UserConfig} from 'vite'
import {defineConfig} from 'vite'
import {pluginExposeRenderer} from './vite.base.config'
import pluginElectronRenderer from 'vite-plugin-electron-renderer'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((env) => { // https://vitejs.dev/config
    const forgeEnv = env as ConfigEnv<'renderer'>
    const {root, mode, forgeConfigSelf} = forgeEnv
    const name = forgeConfigSelf.name ?? ''

    return {
        base: './',
        build: {
            outDir: `.vite/renderer/${name}`,
        },
        clearScreen: false,
        mode,
        plugins: [pluginExposeRenderer(name), pluginElectronRenderer({
            resolve: {
                'electron-store': {type: 'cjs'},
            },
        })],
        resolve: {
            preserveSymlinks: true,
        },
        root,
    } as UserConfig
})
