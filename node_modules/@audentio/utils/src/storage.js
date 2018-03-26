import cookies from './cookies';

/*
 * A (very) simple localStorage wrapper
 * facilitates storing and retrieving objects/arrays
 */

const createStorage = storage => ({
    set: (item, data) => {
        switch (typeof data) {
        case 'object':
            // Stringify objects before storing them
            storage.setItem(item, JSON.stringify(data));
            break;
        default: storage.setItem(item, data);
        }
    },
    get: item => {
        const data = storage.getItem(item);
        try {
            return JSON.parse(data);
        } catch (err) {
            return data;
        }
    },
    remove: item => storage.removeItem(item),
});

const no_op = {
    set: () => {},
    get: () => {},
    remove: () => {},
};

const storage = Object.assign({}, no_op, {
    local: no_op,
    session: no_op,
    cookies: no_op,
});

if (process.env.isBrowser) {
    storage.cookies = createStorage(cookies);

    try {
        // try catch for safari private mode
        storage.local = createStorage(localStorage);
        storage.session = createStorage(sessionStorage);

        // try saving to localstorage
        localStorage.setItem('localStorageTest', 1);
        localStorage.removeItem('localStorageTest');

        // set defaults to localstorage
        storage.set = storage.local.set;
        storage.get = storage.local.get;
        storage.remove = storage.local.remove;
    } catch (e) {
        // localStorage failed
        // set defaults to cookie
        storage.set = storage.cookies.set;
        storage.get = storage.cookies.get;
        storage.remove = storage.cookies.remove;
    }
}

export default storage;
