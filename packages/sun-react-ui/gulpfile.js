const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const less = require('gulp-less');
const through2 = require('through2');
const concat = require('gulp-concat');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'es',
    styles: 'styles',
  },
  styles: 'src/**/*.less', // 样式文件路径 - 暂时不关心
  scripts: ['src/**/*.{ts,tsx}', '!src/**/demo/*.{ts,tsx}'], // 脚本文件路径
};

/**
 *  import './index.scss' => import './index.css'
 *  import '../test-comp/style' => import '../test-comp/style/css.js'
 *  import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function z(file, encoding, next) {
        if (file.path.match(/\.js/)) {
          const content = file.contents.toString(encoding);
          const regex =
            /(import '.\/(styles|style).less';)|(require\(".\/(style|styles).less"\);)/;
          const replaceContent = content.replace(regex, '');
          file.contents = Buffer.from(cssInjection(replaceContent));
          this.push(file);
          next();
        } else {
          this.push(file.clone());
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * esm
 */
function compileESM() {
  const { dest } = paths;

  return compileScripts('esm', dest.esm);
}

function less2css() {
  const { dest } = paths;
  return gulp
    .src(paths.styles)
    .pipe(less())
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(concat('global.css'))
    .pipe(gulp.dest(dest.styles));
}

const buildScripts = gulp.series(less2css, compileCJS, compileESM);

const build = gulp.parallel(buildScripts);

exports.build = build;

exports.default = build;
