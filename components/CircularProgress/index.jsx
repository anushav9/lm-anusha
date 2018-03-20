import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import style from './style.scss';

export default class CircularProgress extends Component {

    static propTypes = {
        value: PropTypes.number,
        max: PropTypes.number,
        className: PropTypes.string,
        children: PropTypes.any,
        kind: PropTypes.string,
        indeterminate: PropTypes.bool,
        size: PropTypes.oneOfType([ // size (css units)
            PropTypes.number,
            PropTypes.string,
        ]),
        stroke: PropTypes.oneOfType([ // stroke width (css units)
            PropTypes.number,
            PropTypes.string,
        ]),
        'track-color': PropTypes.string, // track color
        'progress-color': PropTypes.string, // progress fill color
    }

    static defaultProps = {
        kind: 'primary',
        max: 100,
        indeterminate: false,
    }

    getTransform = (value) => ({ transform: `rotate(${value * 1.8}deg)` })

    render() {
        const { children, value, kind, stroke, indeterminate, size } = this.props;
        const transform = (value === undefined && indeterminate) ? this.getTransform(25) : this.getTransform(value);
        const circle_transformed = (
            <div
                className={classy(style.circle, style['circle--' + kind])}
                style={Object.assign(
                    {
                        borderColor: this.props['progress-color'],
                        borderWidth: stroke,
                    },
                    transform,
                )}
            />
        );

        return (
            <div className={classy(style.main, indeterminate && style['main--indeterminate'], this.props.className)} style={Object.assign({ fontSize: size, width: size, height: size }, this.props.style)}>
                <div style={{ borderWidth: stroke, borderColor: this.props['track-color'] }} className={style.track} />

                <div className={style.mask} style={transform}>
                    {circle_transformed}
                </div>

                <div className={style.mask}>
                    {circle_transformed}
                </div>

                <div className={style.content}>
                    <div className={style['content-inner']}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }

}
