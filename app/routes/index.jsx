/* eslint-disable global-require */

import React from 'react';
import { RootContainer, Redirect } from 'components';
import { Route, Switch } from 'react-router-dom';

export default (
    <RootContainer>
        <Switch>
            
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

            <Route
               exact
               path="/dry-cleaner"
               component={require('routes/dry-cleaner').default}
            />

            <Route
               exact
               path="/tailor"
               component={require('routes/tailor').default}
            />

            <Route
               exact
               path="/stay-at-home"
               component={require('routes/stay-at-home').default}
            />

            <Route
               exact
               path="/locations"
               component={require('routes/locations').default}
            />

            <Route
               exact
               path="/become-a-partner"
               component={require('routes/become-a-partner').default}
            />
        </Switch>
    </RootContainer>
);
