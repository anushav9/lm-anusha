/* eslint-disable global-require */

import React from 'react';
import { RootContainer, Redirect } from 'components';
import { Route, Switch } from 'react-router-dom';

export default (
    <RootContainer>
        <Switch>
            <Redirect
                exact
                from="/redirect-example"
                to="https://audent.io"
                // to="/some-page"
            />

            <Route
                exact
                path="/"
                component={require('routes/home').default}
            />

            <Route
               exact
               path="/laundromat"
               component={require('routes/laundromat').default}
            />
        </Switch>
    </RootContainer>
);
