'use strict';

const fs = require('fs').promises;
const path = require('path');

const core = require('@actions/core');
const exec = require('@actions/exec');

const entry = core.getInput('entry');

(async () => {
  const packageJson = await getPackageJson();
  const entryFile = entry || packageJson.module || packageJson.main;
  if (!entryFile) {
    return core.setFailed(
      `Missing "entry" input or package.json's "module" or "main" field`,
    );
  }

  await exec('node', [
    path.join(__dirname, 'node_modules/documentation/bin/documentation.js'),
    'build',
    entryFile,
    '--github',
    '--output',
    'docs',
    '--format',
    'html',
    '--sort-order',
    'alpha',
  ]);

  const docsDir = await fs.readdir('docs');
  core.warning(docsDir);
})().catch((error) => {
  core.setFailed(error);
});

async function getPackageJson() {
  return JSON.parse(await fs.readFile('package.json', 'utf-8'));
}
