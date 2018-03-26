import { createLocation } from 'history/LocationUtils';

// Emulate browser environment
// adds location and navigator.UA to global
// so we can use these in client code
export default function setupBrowserGlobals(req) {
    const userAgent = req.headers['user-agent'];
    const locationOrigin = (req.secure ? 'https://' : 'http://') + req.get('host');

    /* eslint-disable no-multi-assign */
    global.location = global.window.location = createLocation(req.path);
    global.location.origin = locationOrigin;
    global.location.href = locationOrigin + global.location.pathname;
    global.navigator = global.window.navigator = { userAgent };
}
