import type { Configuration } from 'webpack';
import {rules} from './webpack.rules'

export const mainConfig: Configuration = {
    entry: './src/index.ts',
    module: {
        rules,
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.scss', '.sass'],
        fallback: {
/*            assert: require.resolve('assert/'),
            crypto: require.resolve('crypto-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),*/
        },
    },
};
