const common = require('./webpack.common');

common.module.rules.push({
    test: /\.s[ac]ss$/i,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
});

module.exports = {
    ...common,
    plugins: require('./webpack.plugins'),
};