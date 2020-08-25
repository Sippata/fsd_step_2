const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const cssLoaders = (extra) => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            }
        },
        'css-loader',
    ]

    if (extra) {
        loaders = [...loaders, extra]
    }

    return loaders;
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config;
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
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 3000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './index.pug',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
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
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.pug/,
                use: [
                    'pug-loader'
                ],
            },
            {
                test: /\.(ttf|woff|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};