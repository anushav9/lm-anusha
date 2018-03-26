/* eslint-disable no-console */

const exec = require('child-process-promise').exec;
const serverConfig = require('../config/server');

exec('echo starting...')
    .then(() => exec(`pm2 start dist/server.js --name "${serverConfig.process_name}"`))
    .then(() => {
        console.log('App server started.');
    })
    .then(() => {
        if (serverConfig.deployr) {
            // run deployment server if config is defined
            return exec(`pm2 start internals/deployment/server.js --name "${serverConfig.process_name}__deployr"`);
        }
        return null;
    })
    .then(() => {
        if (serverConfig.deployr) {
            console.log('Deployment server started.');
        }
    })
    .catch(err => console.error(err));
