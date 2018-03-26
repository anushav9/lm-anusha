/* Production build */

const path = require('path');
const webpack = require('webpack');
const noop = require('noop-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('../paths');
const { loaders, aliases } = require('./_common');

module.exports = {
    cache: true,
    stats: {
        colors: true,
        cachedAssets: false,
        children: false,
    },

    // Fix for raven
    // https://github.com/getsentry/raven-node/issues/254
    externals: [
        {
            pg: true,
            formidable: 'commonjs formidable',
            express: 'commonjs express',
        },
    ],

    // To output node bundle
    node: {
        __filename: true,
        __dirname: true,
    },
    target: 'node',

    entry: [
        path.join(PATHS.base, 'server'),
    ],
    output: {
        path: PATHS.dist,
        libraryTarget: 'global',
        filename: 'server.js',
        publicPath: '/dist/',
        chunkFilename: 'chunk-server-[name].js',
    },
    module: {
        loaders: [loaders.json, loaders.jsx, loaders.css, loaders.scss, ...loaders.files],
    },

    resolve: {
        unsafeCache: true,
        extensions: ['.types', '.js', '.jsx', '.json'],
        modules: [
            PATHS.node_modules,
            PATHS.base,
            PATHS.app,
        ],
        alias: aliases(),
    },
    plugins: [
        // provide environment variables
        new webpack.DefinePlugin({
            'process.env.RELEASE': JSON.stringify(process.env.RELEASE),
            __DEV__: process.env.NODE_ENV === 'development',
            __BROWSER__: false,
            'process.env.isBrowser': false,
        }),

        new ExtractTextPlugin({
            filename: 'styles',
            allChunks: true,
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/\.\/locale$/),
    ].map(plugin => plugin || noop()),
};
