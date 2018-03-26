/* eslint-disable no-console */

import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import Raven from 'raven';
import fs from 'fs';

import serverconfig from 'config/server';
import removeTrailingSlash from './removeTrailingSlash';
import handleRobots from './handleRobots';

// static asset sources
const cacheAge = '168h'; // 168 hours (1 week)
const source_app_assets = express.static(
    process.cwd() + '/app/assets',
    { maxage: cacheAge },
);
const source_dist = express.static(
    process.cwd() + '/dist',
    { maxage: cacheAge },
);

export default function createServer() {
    const app = express();

    // Sentry middleware
    app.use(Raven.requestHandler());

    // gzip compression
    if (serverconfig.express.compression) {
        app.use(compression());
    }

    // some security measures
    // https://www.npmjs.com/package/helmet
    app.use(helmet());

    // parse cookies
    app.use(cookieParser());

    // sourcemap control
    // send 404 for sourcemap reqs unless enabled explicitly in config
    if (!serverconfig.express.sourcemaps) {
        app.get('/dist/*.map', (req, res) => {
            res.status(404).end();
        });
    }

    // serve static assets from /app/assets
    app.use('/assets', source_app_assets);

    // serve static assets from /dist
    app.use('/dist', source_dist);

    // serve favicon.ico
    // because some browsers refuse to use the ones we define
    app.get('/favicon.ico', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
    });

    // serve html files from root
    app.get('/*.html', (req, res) => {
        if (fs.existsSync(process.cwd() + req.url)) {
            res.sendFile(process.cwd() + req.url);
        } else {
            res.status(404).end();
        }
    });

    app.get('/sitemap.xml', (req, res) => {
        res.sendFile(process.cwd() + '/sitemap.xml');
    });

    handleRobots(app);
    
    app.use(removeTrailingSlash);

    // Error handling
    app.use(Raven.errorHandler());
    app.use((err, req, res, next) => { // eslint-disable-line
        console.error(err);

        Raven.captureException(err, { req });

        if (err instanceof URIError) {
            res.status(400).end();
        } else {
            res.status(500).sendFile(path.join(process.cwd(), '/server/error.html'));
        }
    });

    return app;
}
