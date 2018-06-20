'use strict';

const switchSnapshots = require('./switchSnapshots');

// Do this as the first thing so that any code reading it knows the right env.
const isNative = process.argv.includes('--n');
process.env.BABEL_ENV = isNative ? 'test' : 'test-web';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});
console.log('*** Running test for ' + (isNative ? 'native' : 'web') + '...');

// Ensure environment variables are read.
require('../config/env');

const jest = require('jest');

const argv = isNative ? process.argv.slice(3) : process.argv.slice(2);

switchSnapshots(isNative);

jest.run(argv);
