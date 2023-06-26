module.exports = {
    module: {
        rules: require('./webpack.rules'),
    },
    resolve: {
        alias: {'react-dom': '@hot-loader/react-dom'},
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.scss', '.sass'],
        fallback: {
            assert: require.resolve('assert/'),
            crypto: require.resolve('crypto-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
        },
    },
};
