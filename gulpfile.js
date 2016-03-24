var gulp = require('gulp');
var RCS = require('react-component-styleguide');

gulp.task('default', function (done) {
  var rcs = RCS('./components/**/*.js', {
    "root": '/atlas',
    "config": './docsConfig.js',
    "dev": 3013,
    "verbose": true
  })

  rcs.generate(function (err) {
    if (err) {
      console.error(String(err))
    }

    done()
  })
})