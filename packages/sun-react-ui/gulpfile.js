const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib', // commonjs 文件存放的目录名 - 本块关注
    esm: 'es', // ES module 文件存放的目录名 - 暂时不关心
    dist: 'dist', // umd文件存放的目录名 - 暂时不关心
  },
  styles: 'src/**/*.less', // 样式文件路径 - 暂时不关心
  scripts: ['src/**/*.{ts,tsx}', '!src/**/demo/*.{ts,tsx}'], // 脚本文件路径
};

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
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
  // 设置环境变量
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        // 找到目标
        if (file.path.match(/[^index]\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          this.push(file); // 新增该文件
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
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS, compileESM);

// 整体并行执行任务
const build = gulp.parallel(buildScripts, less2css);

exports.build = build;

exports.default = build;
