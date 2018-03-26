const passThroughProps = [
    'refCallback',
    'onMouseOver',
    'onMouseEnter',
    'onMouseLeave',
    'className',
    'onClick',
    'style',
    'data-',
];

export default function passProps(props, { include = [], exclude = [] } = {}) {
    const filteredProps = {};

    for (const prop in props) {
        if (
            (
                passThroughProps.indexOf(prop) > -1 || 
                include.indexOf(prop) > -1
            ) && 
            exclude.indexOf(prop) === -1
        ) {
            filteredProps[prop] = props[prop];
        }
    }

    return filteredProps;
}
