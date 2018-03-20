// @flow

import React, { Component } from 'react';
import { isExternalUrl } from 'utils';
import { Redirect as OriginalRedirect, withRouter } from 'react-router-dom';

type RedirectProps = {
    to: Object|string,
    status?: number,
    browserOnly?: boolean,

    // from react-router
    history: Object,
    location: Object,
    staticContext: Object,
};

// Extended Redirect component
// - allows setting http status code
// - supports external URLs

@withRouter
export default class Redirect extends Component<RedirectProps> {
    static defaultProps = {
        status: 302,
        browserOnly: false,
    }

    // Do nothing if on same path as redirect
    shouldRedirect(to: Object|string) {
        const { location } = this.props;

        if (typeof to === 'string' && to === location.pathname) {
            return false;
        }

        return (
            to.pathname !== location.pathname ||
            to.search !== location.search
        );
    }

    render() {
        const { to, status, browserOnly, history, location, staticContext, ...props } = this.props;

        if (!this.shouldRedirect(to)) return null;

        // support `to` object
        let path = to;
        if (typeof to === 'object') {
            path = to.pathname;
        }

        // redirect is not browser specific
        // and staticContext is available (this happens on server)
        if (!browserOnly && staticContext) staticContext.status = Number(status);

        // this is the best we can do right now to support dynamic redirects
        // (not needed on server since redirect is handled by express)
        if (path && isExternalUrl(path) && __BROWSER__) {
            // Replace history entry with previous path
            // so back button works as expected
            // (takes you to redirect path otherwise, which takes you back to where you came from - loop)
            if (location.previousPathname && location.previousPathname !== location.pathname) {
                history.replace(location.previousPathname);
            }

            // Set location.href
            window.location.href = path;

            // Render nothing
            return null;
        }

        // browserOnly redirect on server
        // reset context action and state;
        if (browserOnly && !__BROWSER__) {
            staticContext.action = undefined;
            staticContext.status = undefined;
            return null;
        }

        // react-router Redirect
        // handles internal redirects
        return (
            <OriginalRedirect to={to} {...props} />
        );
    }
}
