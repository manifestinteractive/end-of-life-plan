const autoprefixer = require('autoprefixer')
const browser = require('browser-sync')
const clean = require('gulp-clean')
const colors = require('ansi-colors')
const concat = require('gulp-concat')
const csso = require('gulp-csso')
const fancyLog = require('fancy-log')
const fs = require('fs')
const gulp = require('gulp')
const htmllint = require('gulp-htmllint')
const panini = require('panini')
const postcss = require('gulp-postcss')
const rimraf = require('rimraf').sync
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const version = require('./package.json').version

const assetspath =  'src/assets/'
const nodepath =  'node_modules/'
const port = process.env.EOL_SERVER_PORT || 8081

// Theme Scss variables
const scssOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed',
  includePaths: ['./src/scss']
}

// Erases the dist folder
gulp.task('clean', (done) => {
  rimraf('dist')
  done()
})

// Compile css from node modules
gulp.task('compile-css', (done) => {
  gulp.src([
    `${assetspath}css/bootstrap.css`,
    `${assetspath}css/ionicons.css`
  ])
  .pipe(csso())
  .pipe(concat(`plugins.${version}.min.css`))
  .pipe(gulp.dest('dist/assets/css/'))

  done()
})

// Compile HTML
gulp.task('compile-html', (done) => {
  gulp.src('src/html/pages/**/*.html')
    .pipe(panini({
      root: 'src/html/pages/',
      layouts: 'src/html/layouts/',
      partials: 'src/html/includes/',
      helpers: 'src/html/helpers/',
      data: 'src/html/data/'
    })
  )
  .pipe(gulp.dest('dist'))
  .on('finish', browser.reload)

  done()
})

gulp.task('compile-html:reset', (done) => {
  panini.refresh()
  done()
})

// Compile Theme Scss
gulp.task('compile-scss', (done) => {
  const processors = [
    autoprefixer({
      browsers: [
        'Chrome >= 45',
        'Firefox ESR',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30'
      ]
    })
  ]

  if (process.env.NODE_ENV === 'production') {
    gulp.src('./src/scss/app.scss')
      .pipe(sass(scssOptions).on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(concat(`app.${version}.min.css`))
      .pipe(gulp.dest(`dist/assets/css/`))
  } else {
    gulp.src('./src/scss/app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass(scssOptions).on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write())
      .pipe(concat(`app.${version}.min.css`))
      .pipe(gulp.dest(`dist/assets/css/`))
  }

  if (browser) {
    browser.reload()
  }

  done()
})

// Copy static assets
gulp.task('copy', (done) => {
  gulp.src(['src/html/*.txt']).pipe(gulp.dest('dist/'))
  gulp.src(['src/assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts/'))

  done()
})

// Copy images to production site
gulp.task('copy-images', (done) => {
  gulp.src('src/images/**/*').pipe(gulp.dest('dist/assets/images/'))
  done()
})

// Starts a BrowerSync instance
gulp.task('server', (done) => {
  setTimeout(() => {
    browser.init({
      server: {
        baseDir: 'dist',
        serveStaticOptions: {
          extensions: ['html']
        }
      },
      port: port
    })
  }, 3000)

  done()
})

gulp.task('lint-html', (done) => {
  const reporter = (filepath, issues) => {
    if (issues.length > 0) {
      issues.forEach(function (issue) {
        fancyLog(colors.cyan('[lint-html] ') + colors.white(filepath.replace(__dirname, '.') + ' [' + issue.line + ':' + issue.column + '] ') + colors.red('(' + issue.code + ') ' + issue.msg))
      })

      process.exitCode = 1;
    }
  }

  const options = {
    rules: {
      'attr-bans': [],
      'attr-name-style': false,
      'attr-req-value': false,
      'attr-validate': false,
      'class-style': false,
      'doctype-first': false,
      'doctype-html5': true,
      'id-class-style': false,
      'id-no-dup': true,
      'img-req-alt': true,
      'indent-width': 2,
      'label-req-for': false,
      'line-end-style': false,
      'line-no-trailing-whitespace': false,
      'maxerr': 3,
      'raw-ignore-regex': /\<\!--[^]*?--\>/,
      'spec-char-escape': false,
      'tag-bans': [],
      'tag-close': true,
      'tag-name-match': true
    }
  }

  gulp.src('dist/**/*.html')
  .pipe(htmllint(options, reporter))

  done()
})

// Watch files for changes
gulp.task('watch', (done) => {
  gulp.watch('src/scss/**/*', gulp.series('compile-html:reset','compile-html', 'compile-scss'))
  gulp.watch('src/images/**/*', gulp.series('copy-images'))
  gulp.watch('src/html/pages/**/*', gulp.series('compile-html'))
  gulp.watch(['src/html/{layouts,includes,helpers,data}/**/*'], gulp.series('compile-html:reset','compile-html'))
  gulp.watch(['src/html/{layouts,partials,helpers,data}/**/*'], gulp.series(panini.refresh))

  done()
})

// Main Gulp Tasks
gulp.task('build', gulp.series('clean', 'copy', 'compile-css', 'compile-scss', 'compile-html', 'copy-images'))
gulp.task('default', gulp.series('build', 'watch', 'server'))
