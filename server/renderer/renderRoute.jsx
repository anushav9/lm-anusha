import React from 'react';
import { renderToString } from 'react-dom/server';
import { setupBrowserGlobals } from 'server/utils';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import shhh from 'shhh';
import serverConfig from '../../config/server';

// declare missing browser globals on server
if (typeof window !== 'object') {
    global.window = {};
    global.location = {};
    global.navigator = {};
}

// Imports get hoisted above all code
// so we use require() in order for routes code to execute *after* we declare missing globals (above)
const routes = require('routes').default;

// uses ReactDOMServer to render routes to string
// <StaticRouter /> decides which route gets rendered
export default function renderRoute(store, req) {
    const context = {};
    let markup;

    // setup browser globals – some client-side code depends on this
    // adds location information from express to window
    // hopefully temporary
    setupBrowserGlobals(req);

    // disable console temporarily
    if (serverConfig.env !== 'development') shhh.enable();

    try {
        markup = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {routes}
                </StaticRouter>
            </Provider>,
        );
    } catch (e) {
        if (serverConfig.env !== 'development') shhh.disable();
        throw e;
    }

    return { markup, context };
}
