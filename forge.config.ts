import {MakerDeb} from '@electron-forge/maker-deb'
import {MakerDMG} from '@electron-forge/maker-dmg'
import {MakerRpm} from '@electron-forge/maker-rpm'
import {MakerSquirrel} from '@electron-forge/maker-squirrel'
import {MakerZIP} from '@electron-forge/maker-zip'
import {PublisherGithub} from '@electron-forge/publisher-github'
import {ok} from 'node:assert'
import {existsSync} from 'node:fs'
import {join, normalize} from 'node:path'
import type {ForgeConfig} from '@electron-forge/shared-types'
import {FusesPlugin} from '@electron-forge/plugin-fuses'
import {FuseV1Options, FuseVersion} from '@electron/fuses'
import {AutoUnpackNativesPlugin} from '@electron-forge/plugin-auto-unpack-natives'
import {mainConfig} from './webpack.main.config'
import {rendererConfig} from './webpack.renderer.config'
import {WebpackPlugin} from '@electron-forge/plugin-webpack'

const icons = {
    ico: getIconPath('ico'),
    png: getIconPath('png'),
}

const description = 'Send SMS, Text2Speech messages and more via seven.io.'

// noinspection JSUnusedGlobalSymbols
export default {
    hooks: {
        async packageAfterExtract() { // needed or logo won't be shown in production
            /*            const source = resolve(__dirname, '.webpack/renderer/!*.*')
                        const destination = resolve(__dirname, '.webpack/renderer/main_window')
                        cpSync(source, destination, {recursive: true})*/
        },
    },
    makers: [
        new MakerZIP({}, ['darwin']),
        new MakerSquirrel({
            description,
            iconUrl: icons.ico,
            name: 'seven-desktop', //process.env.npm_package_name,
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
                maintainer: 'seven communications GmbH & Co. KG',
                name: process.env.npm_package_name,
                productDescription: 'Application to send SMS through the seven gateway.',
                productName: 'seven Desktop Application',
                section: 'mail',
                version: process.env.npm_package_version,
            },
        }),
        new MakerDMG({
            additionalDMGOptions: {
                // 'code-sign': {identifier: 'io.seven.desktop'}, // TODO: add signing-identity
                //'icon-size': 256,
            },
            icon: getIconPath('png', 256),
            iconSize: 256,
            name: process.env.npm_package_name,
        }),
        new MakerRpm({
            options: {
                description,
                icon: icons.png,
                name: process.env.npm_package_name,
                version: process.env.npm_package_version,
            },
        }),
    ],
    packagerConfig: {
        appCategoryType: 'public.app-category.social-networking', // MacOSX only
        appCopyright: 'seven communications GmbH & Co. KG',
        asar: true,
        icon: icons.png.replace('.png', ''), // omit file extension for auto-detection according to OS
    },
    plugins: [
        new AutoUnpackNativesPlugin({}),
        new WebpackPlugin({
            devContentSecurityPolicy: "connect-src 'self' https://gateway.seven.io 'unsafe-eval'",
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
        }),
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
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
    const iconPath = normalize(join(__dirname, 'src', 'assets', 'img', `${size}x${size}.${format}`))

    ok(existsSync(iconPath))

    return iconPath
}