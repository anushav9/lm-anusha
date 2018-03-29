import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy, keymap } from 'utils';
import style from './style.scss';

export default class Radio extends Component {
    static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        stateless: PropTypes.bool,
        'label-alignment': PropTypes.oneOf(['left', 'right']),
        kind: PropTypes.string,
        switch: PropTypes.bool,
        checked: PropTypes.bool,
        block: PropTypes.bool,
    }

    static defaultProps = {
        checked: false,
        'label-alignment': 'left',
    }

    static input_initial = false

    constructor(props) {
        super(props);

        this.state = { checked: props.checked };
    }

    componentWillReceiveProps(nextProps) {
        this.state.checked = nextProps.checked;
    }

    toggle = () => {
        const { stateless, onChange, name, value } = this.props;
        const checked = !this.state.checked;

        if (!stateless) this.setState({ checked });

        if (onChange) onChange({ value: !value, name, checked });
    }

    keyListener = e => {
        if (e.keyCode === keymap.SPACE) {
            e.preventDefault();
            this.toggle();
        }
    }

    render() {
        const { block, kind, label, className } = this.props;
        const labelAlignment = this.props['label-alignment'];
        const checked = this.state.checked || this.props.value;

        return (
            <div
                className={classy(
                    style.container,
                    labelAlignment && style[`align-${labelAlignment}`],
                    kind && style[kind],
                    checked && style.checked,
                    block && style.block,
                    this.props.switch && style['container--switch'],
                    className,
                )}
                onMouseDown={this.toggle}
                tabIndex="0"
                onKeyDown={this.keyListener}
            >
                {label && <span className={style.label}>{label}</span>}

                {this.props.switch ?
                    <span className={style.switch}>
                        <span className={style.switch__track} />
                        <span className={style.switch__head} />
                    </span>
                    :
                    <span className={style.radio} />
                }
            </div>
        );
    }
}
