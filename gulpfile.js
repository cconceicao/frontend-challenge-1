const gulp 				= require('gulp');
const sass 				= require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat 			= require('gulp-concat');
const minifyJS		= require('gulp-js-minify');
const minifyCSS		= require('gulp-cssmin');
const rename			= require('gulp-rename');
const uglify			= require('gulp-uglify');
const rev 				= require('gulp-rev');
const sourcemaps 	= require('gulp-sourcemaps');
const replace			= require('gulp-replace-path');


/* HTML */
gulp.task('html', () => {
	return gulp.src('*.html')
		.pipe(replace((/<!-- Start JS -->/, 'teste')))
		.pipe(gulp.dest('dist/dev'));
});


/* JS */
/* Bundle JS files + Minify JS bundle + Uglify JS */
gulp.task('js', () => {
	return gulp.src('assets/js/*.js')
		.pipe(sourcemaps.init())
		//.pipe(concat('bundle.js'))
		.pipe(concat({path: 'bundle.js', cwd: ''}))
		.pipe(minifyJS())
		.pipe(uglify())
		.pipe(rev())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/prod/js'));
});


/* CSS */
/* Compile SASS + Bundle CSS + Minify CSS */
gulp.task('sass', () => {
	return gulp.src('assets/css/*.scss')
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(rev())
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/prod/css'));
});


/* Server */
gulp.task('browser-sync', () => {
	return browserSync.init ({
		server: {
			baseDir: "./"
		}
	});
});


/* Development Environment */
gulp.task('npm run dev', ['browser-sync', 'html', 'sass', 'js'], () => {
	gulp.watch('assets/css/*.scss', ['css-scss']);
	gulp.watch('dist/dev/assets/css/*.css').on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});


/* Build Task */
gulp.task('npm run build', ['html', 'sass', 'js']);