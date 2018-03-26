import fs from 'fs-extra';
import sanitizeFilename from 'sanitize-filename';

fs.ensureDir('./.cache');

const _isRendering = []; // to keep track of active render processes

function cachefilePath(key, context) { 
    return `./.cache/${context}_${sanitizeFilename(key)}`;
}

// save to cache
export function set(key, value, reqUser) {
    try {
        return fs.writeFile(cachefilePath(key, reqUser), value, 'utf8');
    } catch (e) {
        // Failed. likely because .cache does not exist
        return fs.ensureDir('./.cache')
        .then(() => fs.writeFile(cachefilePath(key, reqUser), value, 'utf8'));
    }
}

// Get cached html for user
export function get(key, reqUser) {
    // return cache_store[reqUser][key];
    return new Promise((resolve) => {
        fs.readFile(cachefilePath(key, reqUser), 'utf8')
            .then(resolve)
            .catch(() => resolve(false));
    });
}

// get cached item age
export function age(key, reqUser) {
    const current_time = new Date();
    const file_mtime = new Date(fs.lstatSync(cachefilePath(key, reqUser)).mtime);
    const timeSinceLastSave = (current_time - file_mtime) / 1000; // milliseconds to seconds

    return timeSinceLastSave;
}

// Remove item from cache
export function remove(key, reqUser) {
    const file = cachefilePath(key, reqUser);

    // check if file exists
    // then remove it (always resolves, even when nothing was done)
    return fs.pathExists(file).then((exists) => {
        if (exists) return fs.unlink(file);
        return false;
    });
}

// Indicate start of render
// to avoid running multiple renders of same URL
export function startRender(url, reqUser) {
    _isRendering.push(cachefilePath(url, reqUser));
}

// Indicate render finished
// we're free to render this URL if needed
// Also saves cache so cache.set is not needed
export function finishRender(url, reqUser, html) {
    if (html) set(url, html, reqUser);
    const reqIndex = _isRendering.indexOf(cachefilePath(url, reqUser));
    if (reqIndex > -1) _isRendering.splice(reqIndex, 1);
}

export function isRendering(url, reqUser) {
    return _isRendering.indexOf(cachefilePath(url, reqUser)) > -1;
}
