/* eslint-disable import/no-dynamic-require, global-require */

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const serverConfig = require('../../config/server');
const PATHS = require('../paths');
const { loaders, aliases } = require('./_common');

module.exports = {
    cache: true,

    // Reduce console noise
    stats: {
        chunks: true,
        chunkModules: false,
        chunkOrigins: false,
        colors: true,
        version: true,
        modules: false,
        assets: false,
        cachedAssets: false,
        children: false,
    },
    performance: {
        hints: false,
    },

    // eval doesnt play nice with react error boundries
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://0.0.0.0:${serverConfig.express.development.port}`,
        'webpack/hot/only-dev-server',
        path.join(PATHS.app, 'index'),
    ],
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        chunkFilename: 'chunk-[name].js',
        publicPath: '/dist/',
        devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'file://[absolute-resource-path]?[hash]',
    },
    module: {
        loaders: [loaders.json, loaders.jsx, loaders.css_dev, loaders.scss_dev, ...loaders.files],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            PATHS.node_modules,
            PATHS.base,
            PATHS.app,
        ],
        alias: aliases(),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true,
            __BROWSER__: true,
            'process.env.isBrowser': true,
        }),

        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/\.\/locale$/),
        new webpack.NamedModulesPlugin(),

        // enable hot-reloading
        new webpack.HotModuleReplacementPlugin(),

        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        new CaseSensitivePathsPlugin(),

        // reference modules in DLL
        // makes dev bundle smaller and faster to build
        new webpack.DllReferencePlugin({
            context: PATHS.app,
            manifest: require(path.join(PATHS.dist, 'vendor-manifest.json')),
        }),
    ],
    node: {
        fs: 'empty',
    },
};
