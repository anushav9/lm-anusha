import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Page extends Component {
    render() {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                 <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css"/>
            </Helmet>
        );
    }
}
