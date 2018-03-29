import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { classy } from 'utils';

export default class ToolTip extends Component {
    render() {
        return (
            <div className={style.tooltip}>
                {this.props.children}
            <span className={style.tooltipText}>{this.props.tooltipText}</span>
            </div>
        )
    }
}
