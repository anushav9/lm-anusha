// @flow
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { logger } from 'utils';
import getComponent from './getComponent';

export default function renderTree(tree: Array<Object>, disallowedTags: Array<string>) {
    const renderedTree = [];

    if (typeof tree === 'string') return tree;

    tree.forEach((node, index) => {
        if (node.type === 'text') {
            renderedTree.push(node.text);
        } else if (node.type === 'element') {
            const ElementComponent = getComponent(node.name, disallowedTags);

            if (ElementComponent) {
                // sweet jesus, pooh! that's not honey
                // you're eating recursion
                const children = node.elements && renderTree(node.elements, disallowedTags);
                const nodeprops = node.attributes || {};

                renderedTree.push(<ElementComponent key={index} {...nodeprops}>{children}</ElementComponent>);
            } else {
                logger.error(`Disallowed/Unknown tag <${node.name}> found. skipping`);
            }
        } else {
            logger.error(`Unkown node type – ${node.type}`);
        }
    });

    return renderedTree;
}
