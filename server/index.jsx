// @flow
/* eslint-disable no-console */

import path from 'path';
import Raven from 'raven';
import render from './renderer';
import serverConfig from '../config/server';
import createServer from './createServer';
import { shouldAuth, authenticateUser } from './auth';
import { logRequest } from './utils';
import './sentry';

// Create Express server
// sets up compression, robots.txt, redirects, etc
const server = createServer();

const renderApp = async (req, res) => {
    // do not handle /dist urls
    if (req.url.indexOf('/dist') === 0 || req.url.indexOf('/assets') === 0) {
        res.status(404).end();
        return;
    }

    // user's IP address – nginx support
    // req.connection.remoteAddress doesn't work when running behind nginx
    const remoteAddress = req.headers['x-real-ip'] || req.connection.remoteAddress;

    // Render request
    // takes req and generates HTML from app routes
    // pulls data wherever required and sets up redux rehydration source
    try {
        const rendered = await render(req);

        if (!rendered) throw new Error('Empty render result');

        const { html, context = {}, timeTaken = 'cached' } = rendered;
        const { status = 200, action } = context;

        // Handle redirects
        if (action === 'REPLACE') {
            logRequest(status, `[${remoteAddress}] – ${status} ${req.url} --> ${context.url} (${timeTaken})`);
            res.redirect(status, context.url);
        } else {
            logRequest(status, `[${remoteAddress}] – ${status} ${req.url} (${timeTaken})`);

            res.status(status).send(html);
        }
    } catch (error) {
        // An error occured
        // log to console and sentry
        // send pretty 500 error page

        logRequest(500, `[${remoteAddress}] – 500 ~${req.url}`);

        Raven.captureException(error, { req, extra: { remoteAddress } });
        Raven.captureMessage(`SSR failure – ${req.url}`, { req, extra: { remoteAddress } });

        res.status(500).sendFile(path.join(process.cwd(), '/server/error.html'));
    }
};

server.get('*', (req, res) => {
    if (shouldAuth(req)) {
        authenticateUser(req, res)
            .then((authenticated) => {
                if (authenticated) {
                    renderApp(req, res);
                } else {
                    res.status(401).send('You shall not pass');
                }
            })
            .catch((err) => {
                logRequest(500, `Auth error – 500 ~${req.url}`);
                Raven.captureException(err, { req, extra: { where: 'SSR user auth' } });

                res.status(500)
                    .sendFile(path.join(process.cwd(), '/server/error.html'));
            });
    } else {
        console.log('should not auth');
        renderApp(req, res);
    }
});

// Start server on port defined in server config
const PORT = serverConfig.express.production.port;
server.listen(PORT, err => {
    if (err) console.error(err);

    console.log(`🌐  Server running on port ${PORT}`);
});

export default server;
