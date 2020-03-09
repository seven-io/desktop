module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: {
            amd: false,
        },
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            },
        }
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|webp|svg)$/,
        use: [
            'file-loader',
        ],
    },
];
