import React, { Component } from 'react';
import style from './style.scss';
import { classy } from 'utils';

export default class Container extends Component {

    render() {
        return (
            <div style={this.props.style} className={classy(this.props.className, style.container)}>
                {this.props.children}
            </div>
        );
    }
}
