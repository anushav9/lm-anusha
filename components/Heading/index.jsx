/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import style from './style.scss';

export default class Heading extends Component {

    static propTypes = {
        children: PropTypes.any,
        kind: PropTypes.string,
        color: PropTypes.string,
        className: PropTypes.string,
        weight: PropTypes.string,
        noMargin: PropTypes.bool,
        margin: PropTypes.bool,
    }

    static defaultProps = {
        kind: 'h1',
        upper: false,
    }

    render() {
        const { kind: Tagname, margin, children, color, noMargin, weight, style: inlineStyle, upper, preset, ...rest } = this.props;
        const className = classy(
            style.heading,
            style['heading--' + Tagname],
            color && style['heading--' + color],
            margin && style['heading--fullMargin'],
            noMargin && style['heading--noMargin'],
            weight && style['heading--weight-' + weight],
            this.props.className,
        );

        return (
            <Tagname {...rest} style={inlineStyle} className={className}>{children}</Tagname>
        );
    }
}
