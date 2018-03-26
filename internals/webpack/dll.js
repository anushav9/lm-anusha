const path = require('path');
const webpack = require('webpack');
const noop = require('noop-webpack-plugin');
const { loaders } = require('./_common');
const PATHS = require('../paths');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        vendor: [path.join(PATHS.app, 'vendor.js')],
    },

    output: {
        path: PATHS.dist,
        filename: 'dll.[name].js',
        library: '[name]',
    },

    plugins: [
        isProd &&
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(PATHS.dist, '[name]-manifest.json'),
            name: '[name]',
            context: PATHS.app,
        }),
        isProd &&
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                mangle: true,
                minimize: true,
                sourceMap: false,
                comments: false,
            }),
    ].map(plugin => plugin || noop()),

    module: {
        loaders: [loaders.json],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            PATHS.node_modules,
        ],
    },
};

module.exports = config;
