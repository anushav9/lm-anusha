import React, { Component } from 'react';
import { classy } from 'utils';
import PropTypes from 'prop-types';
import style from '../style.scss';

export default class Grid_Cell extends Component {
    static propTypes = {
        'gutter-vertical': PropTypes.number,
        'gutter-horizontal': PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
        onClick: PropTypes.func,
    }

    getClassName = () => {
        let className = style.cell;

        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
            if (this.props[size] !== undefined) className += ' ' + style[`col-${size}-` + this.props[size]];
            if (this.props[`${size}-push`] !== undefined) className += ' ' + style[`col-${size}-push-` + this.props[`${size}-push`]];
            if (this.props[`${size}-pull`] !== undefined) className += ' ' + style[`col-${size}-pull-` + this.props[`${size}-pull`]];
            if (this.props[`${size}-offset`] !== undefined) className += ' ' + style[`col-${size}-offset-` + this.props[`${size}-offset`]];
        });

        return className;
    }

    gutter = type => {
        if (this.props[`gutter-${type}`] === undefined) {
            return this.props.gutter || 0;
        }

        return this.props[`gutter-${type}`];
    }

    render() {
        const { className: classNameProp, children, cellClass, style: styleProp } = this.props;
        const CellStyle = {
            padding: this.gutter('horizontal') / 2,
        };

        return (
            <div className={classy(this.getClassName(), cellClass)} style={CellStyle}>
                <div style={styleProp} className={classNameProp}>
                    {children}
                </div>
            </div>
        );
    }
}
