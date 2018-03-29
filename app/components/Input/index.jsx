import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { classy } from 'utils';
import style from './style.scss';

export default class Input extends Component {

    static propTypes = {
        name: PropTypes.string,
        placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
        type: PropTypes.oneOf([
            'text',
            'textarea',
            'password',
            'number',
            'email',
            'url',
            'hidden',
            'date',
            'color',
        ]),
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        stateless: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        required: PropTypes.bool,
        validate: PropTypes.bool,
        maxLength: PropTypes.number,
        primitive: PropTypes.bool,
        validationSchema: PropTypes.object,
        validator: PropTypes.string,
        disabled: PropTypes.bool,
        stretch: PropTypes.bool, // full width
        defaultvalue: PropTypes.string,
        step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }

    static defaultProps = {
        value: '',
        primitive: false,
        validate: false,
        required: false,
        stateless: false,
        'icon-alignment': 'left',
        type: 'text',
        styler: {
            height: '32px',
        },
        step: 'any',
    }

    static input_initial = ''

    constructor(props, context) {
        super(props, context);
        this.state = { value: props.value };
    }

    componentDidMount() {
        const { autofocus } = this.props;

        if (autofocus) {
            this.__input.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        // No need to setState()
        // since re-render is already imminent
        this.state.value = nextProps.value;
    }

    onChange = e => {
        const { stateless, maxLength, type, onChange, name } = this.props;
        let value = e.target.value;

        if (type === 'number' && maxLength && e.target.value.length) {
            // Input type is number, and max (upper limit) is defined
            // this resets value to max if value > max
            value = value.slice(0, maxLength);
        }

        if (!stateless) this.setState({ value });

        if (onChange) onChange({ value, name });
    }

    onFocus = () => {
        this.setState({ focus: true });
    }

    onBlur = e => {
        const { type, max, stateless, onChange, name } = this.props;

        let value = e.target.value;

        if (type === 'number' && max && e.target.value.length) {
            // Input type is number, and max (upper limit) is defined
            // this resets value to max if value > max
            value = Math.min(Number(Math.floor(max)), Number(e.target.value));
        }

        // onChange callback
        if (onChange) onChange({ value, name });

        // updates for stateful variant
        if (!stateless) {
            this.setState({
                value,
                focus: false,
            });
        } else {
            this.setState({
                focus: false,
            });
        }
    }

    getPlaceholder = () => {
        const { name, placeholder, type } = this.props;

        if (type === 'password' && placeholder === true) return '••••••••••••••';
        if (typeof placeholder === 'string') return placeholder;
        if (placeholder === true) return name;

        return null;
    }

    getLabel = () => {
        if (this.props.label === true) return this.props.name;
        return this.props.label;
    }

    focusInput = () => {
        this.__input.focus();
    }

    render() {
        const { refCallback, errorPrefix, error, isFetching, name, step, square, containerClass, className, stretch, type, disabled, block, large, icon, labelInline, min, max, defaultvalue } = this.props;
        const { value, focus } = this.state;

        // Decide input tagname based on type
        const InputTag = type === 'textarea' ? 'textarea' : 'input';

        const label = this.getLabel();

        const rest = {};
        if (type === 'input') {
            rest.defaultvalue = defaultvalue;
        }

        return (
            <div
                className={classy(
                    style.container,
                    block && style['container--block'],
                    type === 'textarea' && style['container--textarea'],
                    labelInline && style['container--labelInline'],
                    large && style['container--large'],
                    icon && style['container--icon-' + this.props['icon-alignment']],
                    focus && style['container--focus'],
                    square && style['container--square'],
                    stretch && style['container--stretch'],
                    disabled && style['container--disabled'],
                    isFetching && style['container--isFetching'],
                    error && style['container--error'],
                    containerClass,
                )}
                style={this.props.style}
            >
                {label && <span onClick={this.focusInput} className={classy(this.props.labelInline && style.labelInline, style.label)}>{label}</span>}
                <div className={style.inputwrapper}>
                    <InputTag
                        type={type}
                        name={name}
                        disabled={disabled}
                        ref={ref => {
                            if (refCallback) refCallback(ref);
                            this.__input = ref;
                        }}

                        // Make sure we pass empty string to render a controlled input in case value is not string/number
                        value={(typeof value === 'string' || typeof value === 'number') ? value : ''}

                        className={classy(
                            style.input,
                            type === 'textarea' && style['input--textarea'],
                            className,
                        )}
                        placeholder={this.getPlaceholder()}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        max={max}
                        min={min}
                        step={step}
                        {...rest}
                    />

                    {icon &&
                        <Icon className={style.icon}>{icon}</Icon>
                    }
                </div>

                {error &&
                    <div className={style.error}>
                        {errorPrefix && <span>{label || name} </span>}{error}
                    </div>
                }
            </div>
        );
    }
}
