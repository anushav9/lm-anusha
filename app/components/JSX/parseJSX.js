// @flow

import { xml2js } from 'xml-js';
import sanitizehtml from './sanitize-html';

// create react vdom tree from JSX/HTML string
// memoized for performance
const parseJSX = (source:string, caseSensitive: boolean, allowedTags:Array<string>|boolean):Array<Object> => {
    const sanitizedSource = sanitizehtml(source, {
        // we'll additionally restrict <script> and other tags in renderer (getComponent)
        // sanitizehtml is mainly used to fix problems in markup
        allowedTags,
        allowedAttributes: false,
        parser: {
            recognizeSelfClosing: true,
            lowerCaseTags: caseSensitive,
        },
    });

    // Parse JSX/HTML string
    // we wrap in <root> to avoid text outside a root (which is not allowed)
    return xml2js(`<root>${sanitizedSource}</root>`, {
        // Fix attributes for react
        attributeNameFn: attributeName => {
            switch (attributeName) {
            case 'class': return 'className';
            default: return attributeName;
            }
        },
    }).elements[0].elements;
};

export default parseJSX;
