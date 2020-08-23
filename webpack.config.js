const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const cssLoaders = (extra) => {
    const loaders = [
        'style-loader',
        'css-loader',
    ]

    if (extra) {
        loaders = [...loaders, extra]
    }

    return loaders;
}

/** @type {import('webpack').Configuration} */
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    devtool: isDev ? 'source-map' : '',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './index.pug'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.pug/,
                use: [
                    'pug-loader'
                ]
            }
        ]
    }
};