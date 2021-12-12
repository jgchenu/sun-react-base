#!/usr/bin/env node
const yParser = require('yargs-parser');
const signale = require('signale');

// print version and @local
const args = yParser(process.argv.slice(2));
if (args.v || args.version) {
  console.log(require('../package').version);
  process.exit(0);
}

function stripEmptyKeys(obj) {
  Object.keys(obj).forEach((key) => {
    if (!obj[key] || (Array.isArray(obj[key]) && !obj[key].length)) {
      delete obj[key];
    }
  });
  return obj;
}

function build() {
  // Parse buildArgs from cli
  const buildArgs = stripEmptyKeys({
    esm: args.esm,
    cjs: args.cjs,
    file: args.file,
    target: args.target,
    entry: args.entry,
    config: args.config,
  });

  if (buildArgs.file && buildArgs.entry && buildArgs.entry.length > 1) {
    signale.error(
      new Error(
        `Cannot specify file when have multiple entries (${buildArgs.entry.join(
          ', ',
        )})`,
      ),
    );
    process.exit(1);
  }

  require('../dist').default({
    cwd: args.root || process.cwd(),
    watch: args.w || args.watch,
    buildArgs,
    sourcemap: args.m || args.sourcemap,
  });
}

build();
