import AJV from 'ajv';
import slash from 'slash2';
import { relative, isAbsolute, resolve } from 'path';
import { existsSync } from 'fs';
import schema from './schema';
import { getExistFile } from './utils';
import { IBundleOptions } from './types';

function testDefault(obj: { default?: Record<string, unknown> }) {
  return obj.default || obj;
}

export const CONFIG_FILES = [
  '.buildrc.js',
  '.buildrc.jsx',
  '.buildrc.ts',
  '.buildrc.tsx',
];

const CLASSES = {
  Function: Function,
} as any;

const extendAjv = (ajv: AJV.Ajv) => {
  ajv.addKeyword('instanceof', {
    compile: function (schema: string) {
      const Class = CLASSES[schema];
      return function (data) {
        return data instanceof Class;
      };
    },
  });
  return ajv;
};

export default function ({
  cwd,
  customPath,
}: {
  cwd: string;
  customPath?: string;
}): IBundleOptions {
  let finalPath = '';

  if (customPath) {
    finalPath = isAbsolute(customPath)
      ? customPath
      : resolve(process.cwd(), customPath);
    if (!existsSync(finalPath)) {
      throw new Error(`can\\'t found config file: ${customPath}`);
    }
  }

  const configFile =
    finalPath ||
    getExistFile({
      cwd,
      files: CONFIG_FILES,
      returnRelative: false,
    });

  if (configFile) {
    const userConfig = testDefault(require(configFile)); // eslint-disable-line
    const userConfigs = Array.isArray(userConfig) ? userConfig : [userConfig];
    userConfigs.forEach((userConfig) => {
      const ajv = extendAjv(new AJV({ allErrors: true }));
      const isValid = ajv.validate(schema, userConfig);
      if (!isValid) {
        const errors = (ajv.errors || []).map(
          ({ dataPath, message }, index) => {
            return `${index + 1}. ${dataPath}${dataPath ? ' ' : ''}${message}`;
          },
        );
        throw new Error(
          `
Invalid options in ${slash(relative(cwd, configFile))}

${errors.join('\n')}
`.trim(),
        );
      }
    });
    return userConfig;
  } else {
    return {};
  }
}
