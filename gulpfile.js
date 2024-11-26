export function defaultTask(cb) {
  cb();
}


import gulp from "gulp";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import pug from "gulp-pug";

export function css() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./d/'));
}

export function html() {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({"pretty" : true}))
    .pipe(gulp.dest('./d'));
}

function watchFiles() {
  gulp.watch('./src/scss/*.scss', css);
  gulp.watch(['./src/pug/*.pug', './src/pug/*/*.pug'], html);
}

export const watch = watchFiles;