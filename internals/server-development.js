/* eslint-disable no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { exec } = require('child_process');
const express = require('express');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const serverConfig = require('../config/server');

if (!fs.existsSync('dist/vendor-manifest.json')) {
    console.log(chalk.yellow('Generate DLL first: `npm run dll`'));
    return;
}

// index.html for devserver
// loads DLL and bundle
const html = `
<!DOCTYPE html>
<html>
<body>
    <div id="root"></div>

    <script crossorigin id="js-vendor" src="/dist/dll.vendor.js"></script>
    <script crossorigin id="js-main" src="/dist/main.js"></script>
</body>
</html>`;

// Remove temp files
rimraf.sync(path.join(process.cwd(), 'tmp'));

// Run helper script
exec('node internals/helper.js');

const config = require('./webpack/development');

// Create dev server
const app = new WebpackDevServer(webpack(config), {
    contentBase: 'app/',
    stats: config.stats,
    publicPath: config.output.publicPath,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
});

// Serve files from /dist and /assets
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use('/assets', express.static(process.cwd() + '/app/assets'));

// Send html defined above, for all routes
app.use('*', (req, res, next) => { // eslint-disable-line
    res.set('content-type', 'text/html');
    res.send(html);
    res.end();
});

app.listen(serverConfig.express.development.port, '0.0.0.0', (err) => {
    if (err) console.log(err);

    console.log(`Listening at http://localhost:${serverConfig.express.development.port}/`);
});
