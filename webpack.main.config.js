const rules = require('./webpack.rules');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules,
    },
    resolve: {
        alias: {'react-dom': '@hot-loader/react-dom'},
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', 'scss', 'sass']
    },
};