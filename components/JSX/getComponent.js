// @flow

import components from './components';

// Get component from component list by tagname
// for html elements it returns tagname, unless disallowed (see above)
export default function getComponent(tagname: string, disallowedTags: Array<string>) {
    // First look for it in component map
    if (components[tagname]) return components[tagname];

    // Not found in component map
    // check if allowed. then return tagname (rendered as html element)
    if (disallowedTags.indexOf(tagname) === -1) return tagname;

    return null;
}
