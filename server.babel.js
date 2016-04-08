//allows babel transpilation of server code
require('babel-core/register');
require('babel-polyfill');
require('./server.js');