import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Anchor, CircularProgress } from 'components';
import { classy } from 'utils';
import { Motion, spring } from 'react-motion';
import style from './style.scss';

export default class Button extends Component {
    // Validate props
    static propTypes = {
        large: PropTypes.bool, // size
        small: PropTypes.bool, // size
        primary: PropTypes.bool,
        submit: PropTypes.bool,
        cta: PropTypes.bool,
        block: PropTypes.bool,
        href: PropTypes.string,
        kind: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        label: PropTypes.any,
        ripple: PropTypes.bool,
        border: PropTypes.bool,
        dim: PropTypes.bool,
        text: PropTypes.bool,
        isFetching: PropTypes.bool,
        dialog: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        type: PropTypes.string,
    }

    // Default props
    static defaultProps = {
        ripple: false,
        type: 'button',
    }

    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.rippleRemovers = [];
        this.el = {};
    }

    componentWillUnmount() {
        this.rippleRemovers.forEach(item => {
            clearTimeout(item);
        });
    }

    onClickHandler = e => {
        if (this.props.disabled) return;

        const { onClick } = this.props;
        if (onClick) onClick(e);
    }

    onMouseDownHandler = e => {
        const { ripple } = this.props;

        if (ripple) {
            this.ripple(e.clientX, e.clientY);
        }
    }

    ripple = (clientX, clientY) => {
        const ripples = this.state.ripples || [];
        const containerRect = this.el.rippleContainer.getBoundingClientRect();
        const rippleSize = containerRect.width;

        const calculatedStyle = {
            width: rippleSize,
            height: rippleSize,
            top: clientY - containerRect.top - (rippleSize / 2),
            left: clientX - containerRect.left - (rippleSize / 2),
        };

        if (this.rippleCount === undefined) this.rippleCount = 0;

        ripples.push(<span key={this.rippleCount} className={style.ripple} style={calculatedStyle} />);

        this.rippleCount++;

        this.setState({ ripples });

        // Remove ripple
        this.rippleRemovers.push(
            setTimeout(() => {
                ripples.splice(0, 1);
                this.setState({ ripples });
            }, 1000)
        );
    }

    render() {
        const { type, isFetching, dim, children, label, href, kind, text, border, disabled, block, large, small, dialog, primary, submit, cta } = this.props;

        const className = classy(
            style.button,
            this.props.round && style.pill,
            this.props.wide && style.wide,
            kind ? style['button--' + kind] : style['button--primary'],
            border && style['button--border'],
            text && style['button--text'],
            dim && style['button--dim'],
            disabled && style['button--disabled'],
            isFetching && style['button--isFetching'],
            block && style['button--block'],
            large && style['button--large'],
            small && style['button--small'],
            primary && style['button--primary'],
            submit && style['button--submit'],
            cta && style['button--cta'],
            dialog && style['button--dialog'],
            typeof dialog === 'string' && style[`button--dialog-${dialog}`],
            this.props.className,
        );

        const springConfig = { stiffness: 350, damping: 30 };

        let progress_trackColor = 'rgba(255,255,255,0.4)';
        let progress_progressColor = 'white';
        let progress_kind;

        if (text || border) {
            progress_trackColor = null;
            progress_progressColor = null;
            progress_kind = kind;
        }

        if (kind === 'white') {
            progress_trackColor = 'rgba(0,0,0,0.1)';
            progress_progressColor = 'rgba(0,0,0,0.5)';
            progress_kind = null;
        }

        const btnContent = (
            <Motion defaultStyle={{ content: isFetching ? 0 : 1, spinner: isFetching ? 1 : 0 }} style={{ content: spring(isFetching ? 0 : 1, springConfig), spinner: spring(isFetching ? 1 : 0, springConfig) }}>
                {({ content, spinner }) => (
                    <span>
                        <span className={style.buttonInner} key={1} style={{ opacity: content, transform: `translateY(${spinner * 100}px)` }}>
                            {children || label}
                        </span>
                        <div key={2} className={style['progress-container']} style={{ display: spinner ? 'block' : 'none', opacity: spinner, transform: `translateY(-${content * 100}px)` }}>
                            <CircularProgress
                                stroke={2}
                                kind={progress_kind}
                                className={style.progress}
                                progress-color={progress_progressColor}
                                track-color={progress_trackColor}
                                indeterminate
                                size={18}
                                value={30}
                            />
                        </div>
                    </span>
                )}
            </Motion>
        );

        // Anchor tag <Anchor> if href specified
        if (href) {
            return (
                <Anchor {...this.props} unstyled style={this.props.style} href={href} className={className} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                    {btnContent}
                </Anchor>
            );
        }

        // Default: <button> tag
        return (
            <button type={type} style={this.props.style} className={className} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                {btnContent}
            </button>
        );
    }

}
