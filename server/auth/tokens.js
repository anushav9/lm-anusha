import fs from 'fs-extra';
import serverConfig from '../../config/server';

const AUTH_FILE = './.auth';
const authTokenKey = `__AuthToken_${serverConfig.process_name}`;


// Ensure .auth exists
const ensureAuthFile = async () => {
    const exists = await fs.pathExists(AUTH_FILE);

    if (exists) return;

    await fs.outputJson(AUTH_FILE, { tokens: [] });
};


// Save token to auth file
// we'll read from it later to verify this token
export const saveToken = async (token) => {
    await ensureAuthFile();

    const { tokens } = await fs.readJson(AUTH_FILE);

    await fs.writeJson(
        AUTH_FILE,
        Object.assign({}, {
            tokens: tokens.concat([token]),
        })
    );
};


// generate new random token
export const generateToken = () => Math.random().toString(8).slice(2);


// Ensure token exists and is valid
// (present in .auth file, and not expired)
export const validateToken = async (cookies) => {
    // auth token cookie doesn't exist.
    // return failure
    if (!cookies || !cookies[authTokenKey]) return false;

    await ensureAuthFile();

    // read tokens from auth file
    const { tokens } = await fs.readJson(AUTH_FILE);

    // check if token exists in .auth file
    // validation successful if it does
    return tokens.indexOf(cookies[authTokenKey]) > -1;
};
