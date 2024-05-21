import MakerDeb from '@electron-forge/maker-deb'
import MakerDMG from '@electron-forge/maker-dmg'
import MakerRpm from '@electron-forge/maker-rpm'
import MakerSquirrel from '@electron-forge/maker-squirrel'
import MakerZIP from '@electron-forge/maker-zip'
import PublisherGithub from '@electron-forge/publisher-github'
import {ok} from 'node:assert'
import {cpSync, existsSync} from 'node:fs'
import {join, normalize, resolve} from 'node:path'
import pkg from './package.json'
import type {ForgeConfig} from '@electron-forge/shared-types'
import VitePlugin from '@electron-forge/plugin-vite'
//import {AutoUnpackNativesPlugin} from '@electron-forge/plugin-auto-unpack-natives'

const icons = {
    ico: getIconPath('ico'),
    png: getIconPath('png'),
}

const description = 'Send SMS, Text2Speech messages and more via seven.io.'

// noinspection JSUnusedGlobalSymbols
export default {
    hooks: {
        async packageAfterExtract() { // needed or logo won't be shown in production
            return // TODO
            const source = resolve(__dirname, '.webpack/renderer/*.*')
            const destination = resolve(__dirname, '.webpack/renderer/main_window')
            cpSync(source, destination, {recursive: true})
        },
    },
    makers: [
        new MakerZIP({}, ['darwin']),
        new MakerSquirrel({
            description,
            iconUrl: icons.ico,
            name: pkg.name,
            setupIcon: icons.ico,
        }),
        new MakerDeb({
            options: {
                categories: [
                    'Utility',
                    'Office',
                ],
                description,
                genericName: 'seven Desktop Application',
                homepage: 'https://www.seven.io/',
                icon: icons.png,
                maintainer: pkg.author,
                name: pkg.name,
                productDescription: 'Application to send SMS through the seven gateway.',
                productName: 'seven Desktop Application',
                section: 'mail',
                version: pkg.version,
            },
        }),
        new MakerDMG({
            additionalDMGOptions: {
                // 'code-sign': {identifier: 'io.seven.desktop'}, // TODO: add signing-identity
                'icon-size': 256,
            },
            icon: getIconPath('png', 256),
            iconSize: 256,
            name: pkg.name,
        }),
        new MakerRpm({
            options: {
                description,
                icon: icons.png,
                name: pkg.name,
                version: pkg.version,
            },
        }),
    ],
    packagerConfig: {
        appCategoryType: 'public.app-category.social-networking', // MacOSX only
        appCopyright: pkg.author,
        //asar: true,
        icon: icons.png.replace('.png', ''), // omit file extension for auto-detection according to OS
    },
    plugins: [
        //new AutoUnpackNativesPlugin({}),
        new VitePlugin({
            // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
            // If you are familiar with Vite configuration, it will look really familiar.
            build: [
                {
                    // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                    entry: 'src/main.ts',
                    config: 'vite.main.config.ts',
                },
                {
                    entry: 'src/preload.ts',
                    config: 'vite.preload.config.ts',
                },
            ],
            renderer: [
                {
                    name: 'main_window',
                    config: 'vite.renderer.config.ts',
                },
            ],
        }),
        /*        new WebpackPlugin({
                    devContentSecurityPolicy: 'connect-src \'self\' https://gateway.sms77.io \'unsafe-eval\'',
                    //devServer: {liveReload: false},
                    mainConfig,
                    renderer: {
                        config: rendererConfig,
                        entryPoints: [
                            {
                                html: './src/index.html',
                                js: './src/renderer.ts',
                                name: 'main_window',
                                preload: {
                                    js: './src/preload.ts',
                                },
                            },
                        ],
                    },
                }),*/
        /*        new FusesPlugin({
                    version: FuseVersion.V1,
                }),*/
    ],
    publishers: [
        new PublisherGithub({
            prerelease: true,
            repository: {
                name: 'desktop',
                owner: 'seven-io',
            },
        }),
    ],
} satisfies ForgeConfig

function getIconPath(format: 'ico' | 'png', size = 128): string {
    const iconPath = normalize(
        join(__dirname, 'src', 'assets', 'img', `${size}x${size}.${format}`))

    ok(existsSync(iconPath))

    return iconPath
}