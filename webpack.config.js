const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const cssLoaders = (extra) => {
    let loaders = [
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
    resolve: {
        alias: {
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.pug',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets', 'img'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-loader'
                ],
            },
            {
                test: /\.(ttf|woff|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};