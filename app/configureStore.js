import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from 'modules';

// import { apiMiddleware } from 'api';
// import { API_URL } from 'app/constants';

// `server` object holds server specific stuff
// only passed when store is created on server
const configureStore = (initialState, history, server) => {
    const enhancers = [];

    const middleware = [
        // Router middleware
        routerMiddleware(history),

        // API middleware
        // apiMiddleware({ API_URL, server }),

        // For general async actions
        thunk,
    ];

    // Development enchancements
    //
    if (__DEV__ && __BROWSER__) {
        // Add support for redux devtools extension
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension({
                actionSanitizer: (action) => {
                    if (action.readyState) {
                        let icon = '';
                        if (action.readyState === 'request') icon = '⬆️';
                        if (action.readyState === 'receive' && action.response.status === 'success') icon = '✅';
                        if (action.readyState === 'receive' && action.response.status !== 'success') icon = '❌';

                        const newAction = Object.assign({}, action);
                        newAction.type = `[API] ${action.type} ${icon}`;
                        return newAction;
                    }
                    return action;
                },
            }));
        }
    }

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );

    // Hot-reload reducers
    if (module.hot) {
        module.hot.accept('./modules', () => {
            const nextRootReducer = require('./modules/index').default; // eslint-disable-line global-require

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;
