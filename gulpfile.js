'use strict';

var
    gulp = require('gulp'),
    sass = require('gulp-sass');

// Указываем путь до папок dist и src
var
    source = 'src/',
    dest = 'dist/';

// Путь до файлов Bootstrap
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    };

// Шрифты bootstrap
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

// Пути входа .scss и выхода .css файловю.
var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// Задача копирует шрифты bootstrap в папку dist
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

// Компиляция SASS
gulp.task('sass', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});

// Задача по умолчание
gulp.task('default', ['sass'], function () {
     gulp.watch(scss.watch, ['sass']);
});
