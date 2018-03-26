const path = require('path');

const base = process.cwd();
const app = path.join(base, 'app');
const assets = path.join(base, 'assets');
const node_modules = path.join(base, 'node_modules');
const dist = path.join(base, 'dist');

module.exports = { base, app, node_modules, assets, dist }; // eslint-disable-line
