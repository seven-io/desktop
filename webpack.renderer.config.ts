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
    },
    target: 'electron-renderer',
}
