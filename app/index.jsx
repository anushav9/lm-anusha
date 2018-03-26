import 'utils/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from 'configureStore';
import routes from 'app/routes';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// Rehydrate store with data from server
const initialState = __BROWSER__ ? window.__PRELOADED_STATE__ : {};
delete window.__PRELOADED_STATE__;

// Create store with restored state from above
const store = configureStore(initialState, history);

const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter
                    history={history}
                    store={store}
                >
                    {routes}
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        window.document.getElementById('root'), // mount node
    );
};

// Initial render
renderApp();

// Hot-reload on change
if (module.hot) module.hot.accept('app/routes', renderApp);
