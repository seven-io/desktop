const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
    test: /\.s[ac]ss$/i,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
});

rules.push({
    test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|webp|svg)$/,
    use: [
        'file-loader',
    ],
});

module.exports = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        alias: {'react-dom': '@hot-loader/react-dom'},
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
    },
};