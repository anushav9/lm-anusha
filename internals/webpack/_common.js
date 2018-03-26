/* eslint-disable global-require */

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('../paths');

// resolve: { alias: aliases('development') }
const aliases = () => {
    const _aliases = {};

    _aliases.constants = path.join(PATHS.app, 'constants.js');
    _aliases.ejs = path.resolve(path.join(PATHS.node_modules, 'ejs/ejs.js'));

    // Minified moment.js without locale data
    _aliases.moment = path.join('moment/min/moment.min.js');
    _aliases['moment-timezone'] = path.join(PATHS.node_modules, 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min.js');

    return _aliases;
};

const postcss_loader = {
    loader: 'postcss-loader',
    options: {
        // Necessary for external CSS imports to work
        ident: 'postcss',

        sourceMap: process.env.NODE_ENV === 'development',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 10',
                ],
                flexbox: 'no-2009',
            }),
        ],
    },
};

const sass_loader = {
    loader: 'sass-loader',
    options: {
        includePaths: [path.resolve(PATHS.app, 'components')],
        sourceMap: process.env.NODE_ENV === 'development',
    },
};

const css_loader = {
    loader: 'css-loader',
    options: {
        sourceMap: process.env.NODE_ENV === 'development',
        modules: true,
        importLoaders: 1,
        localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:8]' : '[local]___[hash:base64:8]',
    },
};

// loaders: [loaders.json, loaders.jsx, ...];
const loaders = {
    json: {
        include: /\.json$/,
        loaders: ['json-loader'],
    },

    jsx: {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(@audentio)\/).*/,
        loader: 'babel-loader',
        // include: [PATHS.app, path.join(PATHS.base, 'server')],
        query: {
            cacheDirectory: true,
        },
    },

    css: {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                css_loader,
                postcss_loader,
            ],
        }),
    },

    scss: {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                css_loader,
                postcss_loader,
                sass_loader,
            ],
        }),
    },

    css_dev: {
        test: /\.css$/,
        loaders: [
            'style-loader',
            css_loader,
            postcss_loader,
        ],
    },

    scss_dev: {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            css_loader,
            postcss_loader,
            sass_loader,
        ],
    },

    files: [
        // Images & Videos
        {
            test: /\.(jpe?g|png|gif|svg|mp4)$/i,
            loader: 'file-loader',
        },

        // webfonts
        { test: /webfont\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
    ],
};

module.exports = {
    loaders,
    aliases,
};
