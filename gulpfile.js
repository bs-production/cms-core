let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
// let babel = require("gulp-babel");
let concat = require("gulp-concat");
// let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;


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
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('dist'));
}

function minifyjs() {
  return gulp.src("js/*.js")
  .pipe(uglify())
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest("dist"));
}

const build = gulp.series(minifycss,minifyjs);
exports.default = build;
