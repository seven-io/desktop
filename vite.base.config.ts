import {builtinModules} from 'node:module'
import type {AddressInfo} from 'node:net'
import type {ConfigEnv, Plugin, UserConfig} from 'vite'
import pkg from './package.json'

export const builtins = [
    'electron',
    ...builtinModules.map(m => [m, `node:${m}`]).flat()
]

export const external = [
    ...builtins,
    ...Object.keys('dependencies' in pkg ? (pkg.dependencies as Record<string, unknown>) : {})
]

export function getBuildConfig({root, mode, command}: ConfigEnv<'build'>): UserConfig {
    return {
        build: {
            emptyOutDir: false, // Prevent multiple builds from interfering with each other.
            minify: command === 'build',
            outDir: '.vite/build', // 🚧 Multiple builds may conflict.
            watch: command === 'serve' ? {} : null,
        },
        clearScreen: false,
        mode,
        root,
    }
}

export function getDefineKeys(names: string[]) {
    const define: { [name: string]: VitePluginRuntimeKeys } = {}

    return names.reduce((acc, name) => {
        const NAME = name.toUpperCase()
        const keys: VitePluginRuntimeKeys = {
            VITE_DEV_SERVER_URL: `${NAME}_VITE_DEV_SERVER_URL`,
            VITE_NAME: `${NAME}_VITE_NAME`,
        }

        return {...acc, [name]: keys}
    }, define)
}

export function getBuildDefine({command, forgeConfig}: ConfigEnv<'build'>) {
    const names = forgeConfig.renderer.filter(({name}) => name != null).map(({name}) => name!)

    return Object.entries(getDefineKeys(names)).reduce((acc, [name, keys]) => {
        const {VITE_DEV_SERVER_URL, VITE_NAME} = keys
        const def = {
            [VITE_DEV_SERVER_URL]: command === 'serve'
                ? JSON.stringify(process.env[VITE_DEV_SERVER_URL])
                : undefined,
            [VITE_NAME]: JSON.stringify(name),
        }
        return {...acc, ...def}
    }, {} as Record<string, any>)
}

export function pluginExposeRenderer(name: string): Plugin {
    const {VITE_DEV_SERVER_URL} = getDefineKeys([name])[name]

    return {
        configureServer(server) {
            process.viteDevServers ??= {}
            process.viteDevServers[name] = server  // Expose server for preload scripts hot reload.

            server.httpServer?.once('listening', () => {
                const addressInfo = server.httpServer!.address() as AddressInfo
                process.env[VITE_DEV_SERVER_URL] = `http://localhost:${addressInfo?.port}` // Expose env constant for main process use.
            })
        },
        name: '@electron-forge/plugin-vite:expose-renderer',
    }
}

export function pluginHotRestart(command: 'reload' | 'restart'): Plugin {
    // noinspection JSUnusedGlobalSymbols
    return {
        closeBundle() {
            if (command === 'reload') {
                for (const server of Object.values(process.viteDevServers)) {
                    server.ws.send({type: 'full-reload'}) // Preload scripts hot reload.
                }
            } else {
                // Main process hot restart.
                // https://github.com/electron/forge/blob/v7.2.0/packages/api/core/src/api/start.ts#L216-L223
                process.stdin.emit('data', 'rs')
            }
        },
        name: '@electron-forge/plugin-vite:hot-restart',
    }
}
