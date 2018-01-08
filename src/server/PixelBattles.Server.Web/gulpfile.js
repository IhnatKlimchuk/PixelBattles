﻿var gulp = require("gulp");
var rimraf = require("rimraf");
var fs = require("fs");
var gulpif = require("gulp-if");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var del = require("del");
var gzip = require("gulp-gzip");
var del = require("del");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var browserify = require('browserify');
var ts = require('gulp-typescript');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('gulp-babel');

var paths = {
    dashboard: {
        js: {
            src: [
                "./Client/Dashboard/App/**/*.js"
            ],
            dest: "./wwwroot/dash/js/"
        }
    },
    landing: {

    }
};

//Typescript complie
var tsProject = ts.createProject('tsconfig.json');
var clientOutDir = tsProject.options.outDir;

gulp.task("dashboard:create-pixel-battles-js", function (cb) {
    runSequence(
        "dashboard:clean-typescript-temps",
        "dashboard:compile-typescript",
        "dashboard:generate-pixel-battles-package",
        "dashboard:clean-typescript-temps",
        function () {
            cb();
        });
});

gulp.task("dashboard:clean-typescript-temps", function (cb) {
    return del([clientOutDir]);
});

gulp.task("dashboard:compile-typescript", function (cb) {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(clientOutDir));
});

gulp.task("dashboard:generate-pixel-battles-package", function (cb) {
    return browserify(clientOutDir + '/PixelBattle.js', { standalone: 'pixelBattles' })
        .bundle()
        .pipe(source('pixelBattles.js'))
        .pipe(gulp.dest(paths.dashboard.js.dest))
        .pipe(buffer())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(babel({ presets: ['minify'] }))
        .pipe(gulp.dest(paths.dashboard.js.dest))
        .pipe(gzip())
        .pipe(gulp.dest(paths.dashboard.js.dest));;
});