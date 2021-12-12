import { join, isAbsolute } from 'path';
import slash from 'slash2';
import getBabelConfig from './get-babel-config';

interface IRegisterBabelOpts {
  cwd: string;
  only: string[];
}

export default function (opts: IRegisterBabelOpts) {
  const { cwd, only } = opts;
  const { opts: babelConfig } = getBabelConfig({
    target: 'node',
    typescript: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@babel/register')({
    ...babelConfig,
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
    only: only.map((file) => slash(isAbsolute(file) ? file : join(cwd, file))),
    babelrc: false,
    cache: false,
  });
}
