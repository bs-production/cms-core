let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let babel = require("gulp-babel");

function minifycss() {
  return gulp.src('css/*.css')
  .pipe(cleanCSS({
      debug: true,
      compatibility: 'ie8',
      level: {
          1: {
              specialComments: 0,
          },
      },
  }))

  .pipe(gulp.dest('dist'));
}

function babeljs() {
  return gulp.src("js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
}

const build = gulp.series(minifycss,babeljs);
exports.default = build;
