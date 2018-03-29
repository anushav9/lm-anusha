import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import style from './style.scss';

export default class Paragraph extends Component {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        secondary: PropTypes.bool,
        light: PropTypes.bool,
        large: PropTypes.bool, // large font-sie
    }

    render() {
        const { children, className: classNameProp, secondary, light, white, large, ...props } = this.props;

        const className = classy(
            style.paragraph,
            secondary && style['paragraph--secondary'],
            light && style['paragraph--light'],
            white && style['paragraph--white'],
            large && style['paragraph--large'],
            classNameProp,
        );

        return (
            <p {...props} className={className}>{children}</p>
        );
    }
}
