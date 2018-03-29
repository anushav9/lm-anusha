import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Page extends Component {
    render() {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>LaundryMate</title>
            </Helmet>
        );
    }
}
