/* eslint-disable no-console */

import Helmet from 'react-helmet';
import chalk from 'chalk';
import configureStore from 'configureStore';
import createMemoryHistory from 'history/createMemoryHistory';

import { getRequester } from 'server/utils';
import generateHTML from './generateHTML';
import renderRoute from './renderRoute';
import withCache from './cache';

async function render(req, cache) {
    const reqUser = getRequester(req.headers['user-agent']);
    const start_time = Date.now();

    if (cache) cache.startRender(req.url, reqUser);

    let first_render = true;
    const shouldProcessApiCalls = () => first_render;

    // On first render middleware will push API call promises to this array.
    // We can then wait for those and do a final render to send output
    const promises = [];
    const history = createMemoryHistory();

    // Create redux store
    const store = configureStore({}, history, {
        promises,
        shouldProcessApiCalls,
    });

    // First pass
    let rendered = renderRoute(store, req);
    let head = Helmet.rewind();

    if (promises.length === 0) {
        // Api requests are not needed
        // send the initial render
        const end_time = Date.now();
        const html = generateHTML({ rendered, head, store, req, cache });

        return {
            html,
            context: rendered.context,
            timeTaken: `${end_time - start_time}ms`,
        };
    }

    // This page needs data from API
    // we'll resolve API promises and re-render page with data-rich store
    // then send page and store state to client
    await Promise.all(promises);

    first_render = false;

    // Re-render now that we have new data
    rendered = renderRoute(store, req);
    head = Helmet.rewind();

    const end_time = Date.now();
    const html = generateHTML({ rendered, head, store, req, cache });

    return {
        html,
        context: rendered.context,
        timeTaken: `${end_time - start_time}ms`,
    };
}

// Disable cache if --no-cache is passed
const cacheEnabled = process.argv.slice(2).indexOf('--no-cache') === -1;
if (!cacheEnabled) console.log(chalk.yellow('WARNING: Cache has been disabled.'));

export default cacheEnabled ? withCache(render) : render;
