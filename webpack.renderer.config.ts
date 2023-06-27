import type {Configuration} from 'webpack'
import {plugins} from './webpack.plugins'
import {rules} from './webpack.rules'

rules.push({
    test: /\.s[ac]ss$/i,
    use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'sass-loader'},
    ],
})

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.jsx',
            '.tsx',
            '.css',
            '.json',
            '.scss',
            '.sass',
        ],
        fallback: {
            /*          assert: require.resolve('assert/'),
                      crypto: require.resolve('crypto-browserify'),
                      os: require.resolve('os-browserify/browser'),
                      path: require.resolve('path-browserify'),
                      stream: require.resolve('stream-browserify'),
                      util: require.resolve('util'),*/
        },
    },
    target: 'electron-renderer',
}
