import React, { Component } from 'react';
import ErrorScreen from 'components/ErrorScreen';
import { withRouter } from 'react-router-dom';
import { scrollTo } from 'utils';
import { Helmet } from 'react-helmet';
import appconfig from 'config/application';

let RedBox = () => null;

if (__DEV__) {
    RedBox = require('redbox-react').default; // eslint-disable-line global-require
}

@withRouter
export default class RootContainer extends Component {
    state = {
        error: null,
    }

    componentDidMount() {
        const { history } = this.props;

        // reset scroll on new path (PUSH)
        // scroll is preserved on POP action (back/forward)
        history.listen((location, action) => {
            if (action === 'PUSH') {
                // Scroll to top
                scrollTo(0, { duration: 0 });
            }
        });
    }

    componentWillUpdate() {
        this.state.error = null;
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    render() {
        const { staticContext } = this.props;
        let children = this.props.children;

        if (this.state.error && __DEV__) {
            return (
                <RedBox error={this.state.error} />
            );
        }

        // Error caught in production
        if (this.state.error) {
            // set http code 500
            if (staticContext) staticContext.status = 500;

            // replace children, keeping all the <head> stuff
            children = <ErrorScreen />;
        }

        return [
            <Helmet titleTemplate="LaundryMate" key="helmet">
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

                //favicon
                <link rel="shortcut icon" href="../assets/images/favicomatic/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon-precomposed" sizes="57x57" href="../assets/images/favicomatic/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/images/favicomatic/apple-touch-icon-114x114.png" />
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/images/favicomatic/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/images/favicomatic/apple-touch-icon-144x144.png" />
                <link rel="apple-touch-icon-precomposed" sizes="60x60" href="../assets/images/favicomatic/apple-touch-icon-60x60.png" />
                <link rel="apple-touch-icon-precomposed" sizes="120x120" href="../assets/images/favicomatic/apple-touch-icon-120x120.png" />
                <link rel="apple-touch-icon-precomposed" sizes="76x76" href="../assets/images/favicomatic/apple-touch-icon-76x76.png" />
                <link rel="apple-touch-icon-precomposed" sizes="152x152" href="../assets/images/favicomatic/apple-touch-icon-152x152.png" />
                <link rel="icon" type="image/png" href="../assets/images/favicomatic/favicon-196x196.png" sizes="196x196" />
                <link rel="icon" type="image/png" href="../assets/images/favicomatic/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/png" href="../assets/images/favicomatic/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" type="image/png" href="../assets/images/favicomatic/favicon-16x16.png" sizes="16x16" />
                <link rel="icon" type="image/png" href="../assets/images/favicomatic/favicon-128.png" sizes="128x128" />

                <title>LaundryMate</title>
                
                <meta property="og:title" content="LaundryMate" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="../assets/images/opengraph/open-graph.jpg" />

                <base href="/" />

                {/* in production core.css is inlined and modernizr gets added before </body> */}
                {__DEV__ && <link rel="stylesheet" type="text/css" href="/assets/core.css" />}
                {__DEV__ && <script src="/assets/modernizr.js" />}

                {appconfig.twitter && <meta name="twitter:site" content={appconfig.twitter.username} />}
                {appconfig.facebook && <meta name="fb:app_id" content={appconfig.facebook.app_id} />}
                <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css"/>

            </Helmet>,
            children,
        ];
    }
}
