// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { classy } from 'utils';
// import style from './style.scss';
//
// export default class Section extends Component {
//      render() {
//
//           return (
//                <div>
//                    {this.props.children}
//                </div>
//           )
//      }
// }


/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import style from './style.scss';

export default class Paragraph extends Component {

    static propTypes = {
        children: PropTypes.any,
        color: PropTypes.string,
        className: PropTypes.string,
        noMargin: PropTypes.bool,
        margin: PropTypes.bool,
    }

    // static defaultProps = {
    //     kind: 'h1',
    //     upper: false,
    // }

    render() {
        const { kind: Tagname, margin, children, color,padding, noMargin, weight, style: inlineStyle, upper, preset, ...rest } = this.props;
        const className = classy(
            style.heading,
            // style['heading--' + Tagname],
            color && style['paragraph--' + color],
            padding && style['paragraph--fullPadding'],
            noMargin && style['paragraph--noMargin'],
            weight && style['paragraph--weight-' + weight],
            this.props.className,
        );

        return (
            <div {...rest} style={inlineStyle} className={classy(style.paragraph, className)}>{children}</div>
        );
    }
}
