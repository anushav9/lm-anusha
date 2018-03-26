function removeTrailingSlash(path) {
    if (path.charAt(path.length - 1) === '/') {
        return path.slice(0, -1);
    }

    return path;
}

function removeLeadingSlash(path) {
    if (path.charAt(0) === '/') {
        return path.slice(1, path.length);
    }

    return path;
}

export default function joinUrl(...args) {
    let ret = args[0];

    args.forEach((partial, index) => {
        if (index > 0) ret += '/' + partial;
    });

    ret.replace(/\/\//g, '/');

    return ret;
}
