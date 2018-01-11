const gulp = require('gulp');
const exec = require('child_process').exec;
const chalk = require('chalk')
;

gulp.task('post', () => {
  exec('node ./scripts/web-script.js', (error) => {
    if (error == null) {
      console.log(`${chalk.green('SUCCESS!')} index.html file generated and it's being watched!`);
    }
  });
});
gulp.task('default', ['post'], () => {
  gulp.watch(['./posts/*.md', './public/＊.css', './scripts/*.js', './static-parts/*.html'], ['post']);
});
