const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const clientConfig = {
    target: 'web',
    entry: {
        app: './src/client/main.ts',
        vendors: ['lodash', 'phaser']
    },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'index.html'),
                    to: path.resolve(__dirname, 'dist/client')
                },
                {
                    from: path.resolve(__dirname, 'assets', '**', '*'),
                    to: path.resolve(__dirname, 'dist/client')
                }
            ]
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/client'),
        https: false,
        open: true,
        port: 9000
    }
}

const serverConfig = {
    target: 'node',
    entry: './src/server/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'server.bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/server'),
        https: false,
        open: true,
        port: 9001
    }
}

module.exports = [ clientConfig, serverConfig ];
