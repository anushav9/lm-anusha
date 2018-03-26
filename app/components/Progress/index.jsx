import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import style from './style.scss';

export default class Progress extends Component {
    static propTypes = {
        value: PropTypes.number,
        max: PropTypes.number,
        stroke: PropTypes.number,
        kind: PropTypes.string,
    }

    static defaultProps = {
        value: -1,
        max: 100,
    }

    constructor(props, context) {
        super(props, context);
        this.getScale = this.getScale.bind(this);
    }

    getScale() {
        const progress = (this.props.value < 0) ? 0 : this.props.value;
        const scale = progress / this.props.max;
        return {
            transform: `scaleX(${scale})`,
        };
    }

    render() {
        const { kind, stroke, indeterminate, className, progressClass } = this.props;
        const inlineStyle = {};

        if (stroke > 0) inlineStyle.height = stroke;

        return (
            <div
                style={inlineStyle}
                className={classy(
                    style.progress_container,
                    kind && style[kind],
                    indeterminate && style.indeterminate,
                    className,
                )}
            >
                <div className={classy(style.progress, progressClass)} style={this.getScale()} />
            </div>
        );
    }
}
