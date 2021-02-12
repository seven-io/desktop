module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        parser: {
            amd: false,
        },
        test: /\.(m?js|node)$/,
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        exclude: /(node_modules|\.webpack)/,
        test: /\.tsx?$/,
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
