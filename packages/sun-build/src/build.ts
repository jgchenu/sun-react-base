import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import rimraf from 'rimraf';
import { merge } from 'lodash';
import signale from 'signale';
import chalk from 'chalk';
import { IOpts, IBundleOptions, ICjs, IEsm, Dispose } from './types';
import rollup from './rollup';
import { getExistFile } from './utils';
import getUserConfig, { CONFIG_FILES } from './get-user-config';
import randomColor from './randomColor';
import registerBabel from './register-babel';

export function getBundleOpts(opts: IOpts): IBundleOptions[] {
  const { cwd, buildArgs = {}, rootConfig = {} } = opts;
  const entry = getExistFile({
    cwd,
    files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'],
    returnRelative: true,
  });
  const userConfig = getUserConfig({ cwd, customPath: buildArgs.config });
  const userConfigs = Array.isArray(userConfig) ? userConfig : [userConfig];
  return userConfigs.map((userConfig) => {
    const bundleOpts = merge(
      {
        entry,
      },
      rootConfig,
      userConfig,
      buildArgs,
    );

    // Support config esm: 'rollup' and cjs: 'rollup'
    if (typeof bundleOpts.esm === 'string') {
      bundleOpts.esm = true;
    }
    if (typeof bundleOpts.cjs === 'string') {
      bundleOpts.cjs = true;
    }

    return bundleOpts;
  });
}

function validateBundleOpts(
  bundleOpts: IBundleOptions,
  { cwd, rootPath }: { cwd: string; rootPath: string },
) {
  if (bundleOpts.cjs && (bundleOpts.cjs as ICjs).lazy) {
    throw new Error(
      `
cjs.lazy don't support rollup.
    `.trim(),
    );
  }
  if (!bundleOpts.esm && !bundleOpts.cjs && !bundleOpts.umd) {
    throw new Error(
      `
None format of ${chalk.cyan(
        'cjs | esm | umd',
      )} is configured, checkout readme for usage details.
`.trim(),
    );
  }
  if (bundleOpts.entry) {
    const tsConfigPath = join(cwd, 'tsconfig.json');
    const tsConfig =
      existsSync(tsConfigPath) ||
      (rootPath && existsSync(join(rootPath, 'tsconfig.json')));
    if (
      !tsConfig &&
      ((Array.isArray(bundleOpts.entry) &&
        bundleOpts.entry.some(isTypescriptFile)) ||
        (!Array.isArray(bundleOpts.entry) &&
          isTypescriptFile(bundleOpts.entry)))
    ) {
      signale.info(
        `Project using ${chalk.cyan(
          'typescript',
        )} but tsconfig.json not exists. Use default config.`,
      );
    }
  }
}

function isTypescriptFile(filePath: string) {
  return filePath.endsWith('.ts') || filePath.endsWith('.tsx');
}

export async function build(opts: IOpts) {
  console.log(opts);
  const { cwd, rootPath, watch, sourcemap, buildArgs = {} } = opts;
  const dispose: Dispose[] = [];

  const customConfigPath =
    buildArgs.config &&
    (isAbsolute(buildArgs.config)
      ? buildArgs.config
      : join(process.cwd(), buildArgs.config));

  registerBabel({
    cwd,
    only: customConfigPath
      ? CONFIG_FILES.concat(customConfigPath)
      : CONFIG_FILES,
  });

  function log(msg: string) {
    console.log(randomColor(msg));
  }

  // Get user config
  const bundleOptsArray = getBundleOpts(opts);

  for (const bundleOpts of bundleOptsArray) {
    validateBundleOpts(bundleOpts, { cwd, rootPath });

    // Clean dist
    log(chalk.gray(`Clean dist directory`));
    rimraf.sync(join(cwd, 'dist'));

    // Build umd
    if (bundleOpts.umd) {
      log(`Build umd`);
      await rollup({
        cwd,
        rootPath,
        log,
        type: 'umd',
        entry: bundleOpts.entry,
        watch,
        dispose,
        bundleOpts,
        sourcemap,
      });
    }

    // Build cjs
    if (bundleOpts.cjs) {
      log(`Build cjs with rollup`);
      await rollup({
        cwd,
        rootPath,
        log,
        type: 'cjs',
        entry: bundleOpts.entry,
        watch,
        dispose,
        bundleOpts,
        sourcemap,
      });
    }

    // Build esm
    if (bundleOpts.esm) {
      const esm = bundleOpts.esm as IEsm;
      log(`Build esm with rollup`);
      const importLibToEs = esm && esm.importLibToEs;
      await rollup({
        cwd,
        rootPath,
        log,
        type: 'esm',
        entry: bundleOpts.entry,
        importLibToEs,
        watch,
        dispose,
        bundleOpts,
        sourcemap,
      });
    }
  }

  return dispose;
}

export default async function (opts: IOpts) {
  const dispose = await build(opts);
  return () => dispose.forEach((e) => e());
}
