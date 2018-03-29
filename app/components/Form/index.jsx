import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
// import { Button } from 'components';
// import style from './style.scss';

export default class Form extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        isFetching: PropTypes.bool,
        stateless: PropTypes.bool,
        data: PropTypes.object,
        errors: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            data: props.value || {},
        };

        this.isStateless = !!props.onChange;
    }

    componentWillReceiveProps(nextProps) {
        if (this.isStateless) this.state.data = merge({}, nextProps.value);
    }

    submit = event => {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit({ data: this.state.data });
        }
    }

    updateInput = input => {
        const data = Object.assign({}, this.state.data, { [input.name]: input.value });

        if (!this.isStateless) {
            this.setState({ data });
        }

        if (this.props.onChange) this.props.onChange({ data });
    }

    prepareFields = children => React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        const { disabled, isFetching } = this.props;

        // Traverse child's children (unless string)
        const newprops = {
            children: typeof child.props.children === 'string' ? child.props.children : this.prepareFields(child.props.children),
        };

        // React components
        if (typeof child.type === 'function') {
            if (disabled || isFetching) newprops.disabled = true;
            if (isFetching && child.props.isFetching === undefined) newprops.isFetching = true;
        }

        if (child.props.name && !child.props.orphan) {
            // Form error
            if (this.props.errors && this.props.errors[child.props.name]) {
                newprops.error = this.props.errors[child.props.name];
                if (this.props.errors.ERR_TYPE === 'ERR_FORM_MULTI') {
                    newprops.errorPrefix = true;
                } else {
                    newprops.errorPrefix = false;
                }
            }

            Object.assign(newprops, {
                value: this.state.data[child.props.name] === undefined ? child.props.value : this.state.data[child.props.name],
                onChange: child.props.onChange ? (...args) => {
                    child.props.onChange(...args);
                    this.updateInput(...args);
                } : this.updateInput,
                stateless: true,
            });

            // Initiate state with initial value
            // avoids fields not showing up in form data
            if (this.state.data[child.props.name] === undefined) {
                this.state.data[child.props.name] = child.props.value || child.type.input_initial;
            }
        }

        return React.cloneElement(child, newprops);
    });

    render() {
        const { children, className } = this.props;

        return (
            <form onSubmit={this.submit} className={className}>
                {this.prepareFields(children)}
            </form>
        );
    }
}
