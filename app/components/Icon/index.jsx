import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy, logger } from 'utils';
import style from './style.scss';
import map from './fonts/mdi/map';

export default class Icon extends Component {

    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.oneOfType([
            PropTypes.number, // px
            PropTypes.string, // other value types
        ]),
        title: PropTypes.string,
        kind: PropTypes.string,
        children: PropTypes.string,
    }
    // converts a single hex number to a character
    // note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
    // hex: string, the hex codepoint to be converted
    hex2char = hex => {
        /* eslint-disable no-bitwise */
        let result = '';
        let num = parseInt(hex, 16);
        if (num <= 0xFFFF) {
            result += String.fromCharCode(num);
        } else if (num <= 0x10FFFF) {
            num -= 0x10000;
            result += String.fromCharCode(0xD800 | (num >> 10)) + String.fromCharCode(0xDC00 | (num & 0x3FF));
        }
        return result;
    }

    // converts a string containing CSS escapes to a string of characters
    // up to 6 digit escapes to characters & throw away any following whitespace
    convertCSS2Char(str) {
        return str.replace(
            /\\([A-Fa-f0-9]{2,6})(\s)?/g,
            (matchstr, parens) => this.hex2char(parens)
        );
    }

    render() {
        const { kind, color, size, children, title, className, onClick, tabIndex, onKeyPress } = this.props;

        // if (typeof children !== 'string') return null;

        const inlineStyle = { ...this.props.style };
        if (color) inlineStyle.color = color;
        if (size) inlineStyle.fontSize = size;

        if (!map[children]) {
            logger.warn(children + ' missing in iconmap');
            return null;
        }

        return (
            <i
                title={title}
                tabIndex={tabIndex}
                className={classy(style.icon, className, kind && style['icon--' + kind], onClick && style.clickable)}
                style={inlineStyle}
                role="presentation"
                onClick={onClick}
                onKeyPress={onKeyPress}
            >
                {map[children]}
            </i>
        );
    }
}
