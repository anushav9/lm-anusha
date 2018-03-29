import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classy } from 'utils';
import { Icon, Text } from 'components';
import style from './style.scss';

export default class Select extends Component {
    static propTypes = {
        // Default value
        // (if an option has the same value, it'll be shown as selected by default)
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),

        // Initial open state
        open: PropTypes.bool,

        // Menu options
        // array of objects
        options: PropTypes.arrayOf(PropTypes.shape({
            face: PropTypes.any.isRequired, // face value (for display)
            value: PropTypes.any.isRequired, // actual value (will be used in form)
        })).isRequired,

        // standard form-input props
        stateless: PropTypes.bool,
        name: PropTypes.name,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        open: false,
    }

    constructor(props) {
        super(props);

        this.state = { value: props.value, open: props.open };
    }

    componentDidMount() {
        document.addEventListener('click', this.closeOnOutSideClick);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stateless) {
            this.state.value = nextProps.value;
            this.state.open = nextProps.open;
        }

        let optionsChanged = (nextProps.options.length !== this.props.options.length);

        if (!optionsChanged) {
            for (let i = 0, len = this.props.options.length; i < len; i++) {
                const current = this.props.options[i];
                let found = false;
                for (let j = 0, len2 = nextProps.options.length; i < len2; j++) {
                    const next = nextProps.options[j];
                    if (current.value === next.value) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    optionsChanged = true;
                    break;
                }
            }
        }


        if (nextProps.selectFirst && optionsChanged) {
            const value = nextProps.options[0].value || '';

            this.setState({
                value,
            });

            if (nextProps.onChange) nextProps.onChange({ value });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeOnOutSideClick);
    }

    getFaceValue = value => {
        let val = value;
        this.props.options.forEach(option => {
            if (option.value === value && option.face) {
                val = option.face;
            }
        });

        return val;
    }

    closeOnOutSideClick = e => {
        if (e.target === this.__container || this.__container.contains(e.target) || this.state.open === false) {
            return;
        }

        this.setState({ open: false });
    }

    toggle = () => {
        this.setState({
            open: !this.state.open,
        });
    }

    change = e => {
        const { stateless, options, onChange, name } = this.props;
        let valueIndex = null;
        let currentNode = e.target;
        for (let i = 0; i < 10; i++) {
            if (currentNode && currentNode.dataset && currentNode.dataset.valueIndex) {
                valueIndex = currentNode.dataset.valueIndex;
                break;
            } else {
                currentNode = currentNode.parentNode;
            }
        }

        if (valueIndex === null) return;

        const value = options[valueIndex].value;

        e.preventDefault();

        if (stateless) {
            this.state.open = false;
        } else {
            this.setState({ value, open: false });
        }

        if (onChange) onChange({ name, value });
    }

    render() {
        const { options, block, large, style: inlineStyle, className, prefix, dropdownClassName } = this.props;
        const { value, open } = this.state;

        return (
            <div
                style={inlineStyle}
                ref={ref => { this.__container = ref; }}
                className={classy(
                    style.select,
                    open && style['select--open'],
                    block && style['select--block'],
                    large && style['select--large'],
                    className,
                )}
            >
                <div onClick={this.toggle} className={style.value}>
                    <span>
                        {prefix && <Text dim>{prefix}</Text>}{this.getFaceValue(value)}
                    </span>
                    <Icon>{open ? 'chevron-up' : 'chevron-down'}</Icon>
                </div>

                <div className={classy(style.options, dropdownClassName)}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={this.change}
                            data-value-index={index}
                            className={classy(style.option, value === option.value && style['option--active'])}
                        >
                            {option.face || option.value}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
