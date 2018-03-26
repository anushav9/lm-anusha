/* eslint-disable no-console */

const spawn = require('child_process').spawn;

const args = process.argv.slice(2);
const should_watch = args.indexOf('watch') > -1;
const bundle_type = args.indexOf('server') > -1 ? 'server' : 'client';
const node_env = args.indexOf('dev') > -1 ? 'development' : 'production';
const babel_env = bundle_type === 'server' ? 'server' : node_env;

// Build bundle
// with webpack
(() => {
    const webpack_config = bundle_type === 'server' ? 'internals/webpack/server' : 'internals/webpack/client';
    const build_args = ['./node_modules/.bin/webpack', '--config', webpack_config];

    console.log(`Building ${bundle_type} bundle [${node_env}] ...`);

    if (should_watch) build_args.push('--watch');

    const build = spawn(
        'node',
        build_args,
        {
            stdio: 'inherit',
            env: {
                RELEASE: process.env.RELEASE,
                NODE_ENV: node_env,
                BABEL_ENV: babel_env,
            },
            shell: true,
        },
    );

    build.on('error', err => {
        console.log(err);
    });
})();
