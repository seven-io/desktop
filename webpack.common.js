module.exports = {
    module: {
        rules: require('./webpack.rules'),
    },
    resolve: {
        alias: {'react-dom': '@hot-loader/react-dom'},
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', 'scss', 'sass']
    },
};