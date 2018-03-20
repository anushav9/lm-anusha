import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const modules = [
    'global',
];

const reducers = {
    routing: (state, action) => {
        const newState = routerReducer(state, action);

        if (state && state.location) newState.location.previousPathname = state.location.pathname;
        if (state) newState.previousLocation = state.location || {};

        return newState;
    },
};

modules.forEach(reducer => {
    reducers[reducer] = require('modules/' + reducer).default; // eslint-disable-line
});

export default combineReducers(reducers);
