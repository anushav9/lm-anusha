export default function isExternalUrl(path) {
    if (
        path.indexOf(window.location.origin) !== 0 && // not a link to same site
        (
            path.indexOf('http://') === 0 ||
            path.indexOf('https://') === 0 ||
            path.indexOf('ftp://') === 0 ||
            path.indexOf('tel:') === 0 ||
            path.indexOf('mailto:') === 0
        )
    ) {
        return true;
    }

    return false;
}
