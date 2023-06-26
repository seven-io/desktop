import {MakerDeb} from '@electron-forge/maker-deb'
import MakerDMG from '@electron-forge/maker-dmg'
import {MakerRpm} from '@electron-forge/maker-rpm'
import {MakerSquirrel} from '@electron-forge/maker-squirrel'
import {MakerZIP} from '@electron-forge/maker-zip'
import {WebpackPlugin} from '@electron-forge/plugin-webpack'
import PublisherGithub from '@electron-forge/publisher-github'
import {ForgeConfig} from '@electron-forge/shared-types'
import {normalize, join, resolve} from 'node:path'
import {existsSync} from 'node:fs'
import {ok} from 'node:assert'
const pkg = require('./package.json')
import {mainConfig} from './webpack.main.config'
import {rendererConfig} from './webpack.renderer.config'
const cpy = require('cpy')

const getIconPath = (format: 'ico' | 'png', size = 128) => {
    const iconPath = normalize(
        join(__dirname, 'src', 'assets', 'img', `${size}x${size}.${format}`));

    ok(existsSync(iconPath));

    return iconPath;
};

const icons = {
    ico: getIconPath('ico'),
    png: getIconPath('png'),
};

const description = 'Send SMS, Text2Speech messages and more via seven.io.';

const config: ForgeConfig = {
    hooks: {
        async packageAfterExtract() {
            await cpy.prototype( // needed or logo won't be shown in production
                [resolve(__dirname, '.webpack/renderer/*.*')],
                resolve(__dirname, '.webpack/renderer/main_window')
            );
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
                    'Office'
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
                version: pkg.version
            }
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
        icon: icons.png.replace('.png', ''), // omit file extension for auto-detection according to OS
    },
    plugins: [
        new WebpackPlugin({
            devServer: { liveReload: false },
            mainConfig,
            renderer: {
                config: {
                    ...rendererConfig,
                    //plugins: [],
                },
                entryPoints: [{
                    html: './src/index.html',
                    js: './src/renderer.ts',
                    name: 'main_window',
                    preload: {
                        //config: {},
                        js: './src/preload.ts',
                    }
                },],
            }
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
};

export default config
