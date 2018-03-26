// @flow

import React, { Component } from 'react';
import { deprecate } from 'utils';
import memoize from 'memoizee';
import parseJSX from './parseJSX';
import renderTree from './renderer';

const render = memoize((source, caseSensitive, _allowedTags, _disallowedTags) => {
    let disallowedTags = [];
    let allowedTags = false;
    if (_allowedTags) allowedTags = _allowedTags.split(',');
    if (_disallowedTags) disallowedTags = _disallowedTags.split(',');

    // jsx -> Object
    const rawTree = parseJSX(source, caseSensitive, allowedTags);

    // Object -> react VDOM
    return renderTree(rawTree, disallowedTags);
}, {
    // memoize string
    primitive: true,

    // will hit cache even if options change
    length: 1,
});

type Props = {
    children: string,
    caseSensitive: boolean,
    source?: string,

    // comma delimited list or boolean
    allowedTags: string | boolean,
    disallowedTags: boolean | string,
};

export default class JSX extends Component<Props> {
    static defaultProps = {
        caseSensitive: false,
        allowedTags: false,
        disallowedTags: 'style,script,link,meta,object',
    }
    
    render() {
        const { children, source, caseSensitive, allowedTags, disallowedTags, ...props } = this.props;
        const str = children || source;

        if (source) {
            deprecate('1.2', '<JSX> source prop', 'Pass source as children instead');
        }

        return (
            <div {...props}>
                {render(str, caseSensitive, allowedTags, disallowedTags)}
            </div>
        );
    }
}
