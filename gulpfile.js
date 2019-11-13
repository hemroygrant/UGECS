const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile Sass & Inject into Browser
function bs(){
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}
function matlz(){
    return gulp.src('node_modules/materialize-css/sass/materialize.scss')
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}
function mycss(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}
function style(){
    return bs(),matlz(),mycss();
}
exports.style = style;

//Move JS files to src/js
function js(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/materialize-css/dist/js/materialize.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}
gulp.task(js);

//Watch Sass & Server 
function serve(){
    browserSync.init({server: {baseDir: './src'}});
    gulp.watch('node_modules/bootstrap/scss/bootstrap.scss', style);
    gulp.watch('src/scss/*.scss', style);
    gulp.watch('node_modules/materialize-css/sass/materialize.scss', style);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
}
gulp.task(serve);

//Move Fonts folder to source
function fonts(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
}
gulp.task(fonts);

//Move Font-Awesome CSS folder to src/css
function fa(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
}
gulp.task(fa);

gulp.task('default', gulp.parallel(style, js, serve, fa, fonts));