/* eslint-disable no-console */

import chalk from 'chalk';
import { validateToken, generateToken, saveToken } from './tokens.js';
import serverConfig from '../../config/server';


const noAuth = process.argv.slice(2).indexOf('--no-auth') > -1; // --no-auth option passed
const authNeeded = !!serverConfig.express.auth; // auth is defined in config

if (authNeeded && noAuth) {
    // Auth needed, but disabled
    console.log(chalk.yellow('WARNING: Authentication has been disabled.'));
}

export function shouldAuth() {
    return authNeeded && !noAuth;
}

export async function authenticateUser(req, res) {
    const whitelist = serverConfig.express.auth.whitelist || [];
    const remoteAddress = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const isWhiteListed = whitelist.indexOf(remoteAddress) > -1;

    const CREDENTIALS = {
        login: serverConfig.express.auth.username,
        password: serverConfig.express.auth.password,
    };

    // good to go if user is whitelisted
    if (isWhiteListed) {
        return true;
    }

    // Validate token in user's cookies
    const isValid = await validateToken(req.cookies);

    // Valid token found
    if (isValid) {
        return true;
    }

    // Authenticate with password
    // and save token when successful
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    // Auth fail if credentials do not match
    if (login !== CREDENTIALS.login || password !== CREDENTIALS.password) {
        res.set('WWW-Authenticate', `Basic realm="${serverConfig.process_name}"`);
        return false;
    }

    const authToken = generateToken();

    // Add new token to client cookies
    res.cookie(`__AuthToken_${serverConfig.process_name}`, authToken);

    // Add new token to .auth file
    // for server verificartion on next request
    await saveToken(authToken);

    return true;
}
