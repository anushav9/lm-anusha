/* Production build */

const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const noop = require('noop-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cssnano = require('cssnano');
const PATHS = require('../paths');
const { loaders, aliases } = require('./_common');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    cache: true,
    stats: {
        modules: false,
        chunks: false,
        colors: true,
        children: false,
    },
    entry: [
        path.join(PATHS.app, 'index'),
    ],
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: '/dist/',
        sourceMapFilename: '[name].js.map',
        chunkFilename: 'chunk-[id]-[chunkhash].js',
    },
    module: {
        loaders: [loaders.json, loaders.jsx, loaders.css, loaders.scss, ...loaders.files],
    },
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            PATHS.app,
            PATHS.base,
            PATHS.node_modules,
        ],
        alias: aliases(),
    },
    plugins: [
        // use md5 for chunk hash
        new WebpackMd5Hash(),

        // provide environment variables
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
            __DEV__: false,
            __BROWSER__: true,
            'process.env.isBrowser': true,
        }),

        // extract styles into a file
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/\.\/locale$/),

        isProd &&
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                mangle: true,
                minimize: true,
                sourceMap: true,
                comments: false,
            }),

        isProd &&
            new OptimizeCssAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true,
            }),

        isProd &&
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].js.map',
                append: '\n//# sourceMappingURL=/dist/[url]',
                test: /\.js$/,
            }),

        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.html',
            openAnalyzer: false,
            logLevel: 'warn',
        }),
    ].map(plugin => plugin || noop()),
};
