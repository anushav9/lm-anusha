import React, { Component } from 'react';
import { Icon } from 'components';
import { classy, keymap } from 'utils';
import style from './style.scss';

export default class Checkbox extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: props.checked === true,
        };

        this.toggle = this.toggle.bind(this);
    }

    keyPress = e => {
        if (e.nativeEvent.keyCode === keymap.SPACE) {
            this.toggle();
        }
    }

    toggle() {
        const { onChange, stateless, name, value } = this.props;
        const { checked } = this.state;

        if (stateless) {
            if (onChange) onChange({ value: !value, name });
        } else {
            this.setState({
                checked: !checked,
            });
            if (onChange) onChange({ value: !checked, name });
        }
    }

    render() {
        const isChecked = (this.props.stateless) ? this.props.value : this.state.checked;
        const icon = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

        return (
            <span className={classy(style.checkbox, this.props.className, isChecked && style.checked)} onClick={this.toggle}>
                <Icon onKeyPress={this.keyPress} tabIndex="0" className={classy(style.icon, this.props.iconClass)} size={this.props.size}>{icon}</Icon>
                {this.props.label || this.props.children}
            </span>
        );
    }
}
