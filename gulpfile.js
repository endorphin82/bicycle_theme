const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
// const tinypng = require('gulp-tinypng-compress');

gulp.task('scss', () =>
  gulp
    .src(['src/scss/**/*.scss', '!src/scss/libs/*.*', '!src/scss/**/_*.*'])

    //min
    // .pipe(sass({ outputStyle: 'compressed' }))
    // .pipe(rename({ suffix: '.min' }))

    //NoMin
    .pipe(sass({outputStyle: 'expanded'}))

    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('html', () =>
  gulp
    .src(['src/**/*.html', '!src/**/_*.*'])
    .pipe(rigger())
    //min
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
);

// gulp.task('tinypng', function (){
//   gulp
//     .src('src/img/**/*.{png,jpg,jpeg}')
//     .pipe(tinypng({
//       key: 'TKzPZNpp2CgHVL39hlBdycdCDlvlp2mC',
//       sigFile: 'images/.tinypng-sigs',
//       log: true
//     }))
//     .pipe(gulp.dest('build/img'))
// });

gulp.task('js', () =>
  gulp
    .src(['src/js/**/*.js', '!src/js/libs/*.*', '!src/js/**/_*.*'])
    .pipe(concat('main.js'))
    //min
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))

    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('img', () =>
  gulp
    .src('src/img/**/*.*')
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('fonts', () =>
  gulp
    .src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/**/*.html', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js', gulp.parallel('js'));
  gulp.watch('src/img/**/*.*', gulp.parallel('img'));
  gulp.watch('src/fonts/**/*.*', gulp.parallel('fonts'));
});

gulp.task('default',
  gulp.parallel('js', 'img', 'scss', 'fonts', 'html', /* 'js-libs',*/ 'browser-sync', 'watch')
);
