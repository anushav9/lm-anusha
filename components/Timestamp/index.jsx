// @flow

import React, { Component } from 'react';
import { classy } from 'utils';
import formatTime from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
import formatDistance from 'date-fns/formatDistance';

type Props = {
    className: string,

    // dateTime
    // new Date() / UNIX time / ISO 8601 / (deprecated) RFC2822
    children: string | Object,

    // custom date format
    // https://date-fns.org/v2.0.0-alpha.6/docs/format
    format: string,

    // Output type (overrides format prop)
    // relative: "4 days ago", "about one year ago"
    // calendar: "Sunday at 04:30 a.m.", "12/31/2017"
    output?: 'relative' | 'calendar',

    // format options
    // https://date-fns.org/v2.0.0-alpha.6/docs/Options
    formatOptions: Object,

    // Live update timestamp
    // defaults to true when output is defined
    liveUpdate: boolean,
};

export default class Timestamp extends Component<Props> {
    _timer: number

    static defaultProps = {
        format: 'MMMM Do YYYY, h:mm a',
        formatOptions: {},
    }

    componentDidMount() {
        const { output, liveUpdate } = this.props;

        let shouldLiveUpdate = !!output;

        if (typeof liveUpdate === 'boolean') {
            shouldLiveUpdate = liveUpdate;
        }

        if (shouldLiveUpdate) {
            this.startUpdating();
        }
    }

    componentWillUnmount() {
        this.stopUpdating();
    }

    startUpdating() {
        this._timer = setInterval(() => {
            this.forceUpdate();
        }, 60 * 1000);
    }

    stopUpdating() {
        clearInterval(this._timer);
    }

    format(time: string | Object): string {
        const { output, format, formatOptions } = this.props;

        const baseDate = new Date();

        if (output) {
            switch (output) {
            case 'calendar': return formatRelative(time, baseDate, formatOptions);
            
            default: return formatDistance(
                time,
                baseDate,
                Object.assign({ addSuffix: true }, formatOptions),
            );
            }
        }

        return formatTime(time, format, formatOptions);
    }

    render() {
        const { children, className } = this.props;
        
        if (!children) return null;

        const time_abs = formatTime(children, 'MMMM Do YYYY, h:mm a');

        return (
            <span className={classy(className)} title={time_abs}>
                {this.format(children)}
            </span>
        );
    }
}
