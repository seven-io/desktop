import type ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {IS_DEV} from './src/util/constants'

const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin: typeof ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

export const plugins = [
    new ForkTsCheckerWebpackPlugin({logger: 'webpack-infrastructure'}),
    IS_DEV && new ReactRefreshWebpackPlugin({
        overlay: {
            sockIntegration: 'whm',
        },
    }),
].filter(Boolean)
