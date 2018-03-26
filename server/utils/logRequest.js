/* eslint-disable no-console */

import chalk from 'chalk';

export default function logRequest(status, message) {
    if (status === 404 || status === 500) {
        console.log(chalk.red(message));
    } else if (status === 302 || status === 301 || status === 307) {
        console.log(chalk.blue(message));
    } else {
        console.log(message);
    }
}
