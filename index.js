'use strict';

const core = require('@actions/core');
const documentation = require('documentation');

const entry = core.getInput('entry');

core.warning(`cwd: ${process.cwd()}`);
core.info(`entry: ${entry}`);
