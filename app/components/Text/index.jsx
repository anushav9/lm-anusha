import React, { Component } from 'react';
import { classy } from 'utils';
import style from './style.scss';

export default class Text extends Component {
    render() {
        const { className: classNameProp, children } = this.props;

        const toggles = ['dim', 'block', 'small', 'smaller', 'margin', 'bold', 'semibold', 'large'];
        const classy_args = [];

        toggles.forEach(toggle => {
            if (this.props[toggle] === true) classy_args.push(style[toggle]);
        });

        const className = classy(
            classNameProp,
            ...classy_args,
        );

        return (
            <span style={this.props.style} className={className}>{children}</span>
        );
    }
}
