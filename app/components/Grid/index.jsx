import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy, pureRender } from 'utils';
import style from './style.scss';

export default class Grid extends Component {

    static propTypes = {
        children: PropTypes.any,
        gutter: PropTypes.number,
        'gutter-vertical': PropTypes.number,
        'gutter-horizontal': PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
    }

    static defaultProps = {
        gutter: 15,
    }

    shouldComponentUpdate = pureRender

    gutter = type => {
        if (this.props[`gutter-${type}`] === undefined) {
            return this.props.gutter;
        }

        return this.props[`gutter-${type}`];
    }

    render() {
        const { style: styleProp, children, className } = this.props;

        const inlineStyle = Object.assign({
            margin: -(this.gutter('horizontal') / 2),
        }, styleProp);

        return (
            <div className={classy(style.grid, className)} style={inlineStyle}>
                {React.Children.map(children, child => {
                    if (!child || !child.props) return null;
                    return React.cloneElement(child, {
                        gutter: this.props.gutter,
                        'gutter-vertical': this.gutter('vertical'),
                        'gutter-horizontal': this.gutter('horizontal'),
                    });
                }
                )}
            </div>
        );
    }
}
