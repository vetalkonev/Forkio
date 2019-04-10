const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const gulpSequence = require('gulp-sequence');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require("gulp-clean-css");


//CONCAT + MAPS + CLEAN + autoprefixer
gulp.task("scss", function(){
    return gulp.src("./src/scss/**/*.scss")

               .pipe(sourcemaps.init())
               .pipe(sass({includePaths: ['./src/scss']}).on("error", sass.logError))
               .pipe(sourcemaps.write())
               .pipe(autoprefixer({
                   browsers: ['last 2 versions'],
                   cascade: false
               }))
               .pipe(cleanCSS())
               .pipe(rename('style.min.css'))
               .pipe(gulp.dest("./dist/"))
               .pipe(browserSync.reload({stream: true}));         
});


// CONCAT JS
gulp.task("concat", function() {
    return gulp
    .src(['./src/js/libs/*.js', './src/js/script/*.js'])
    .pipe(concat('script.js')) 
    .pipe(gulp.dest('./src/js'));
});

gulp.task("uglify", ['concat'], function () {
    return gulp
        .src("./src/js/script.js")
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest("./src/js"));
});


//COPY CSS
gulp.task('copyCSS', function(){
    return gulp.src('./src/style.min.css')
            .pipe(gulp.dest('./dist/css/'))

});


//COPY JS
gulp.task('copyJS', function(){
    return gulp.src('./src/js/script.min.js')
            .pipe(gulp.dest('./dist/js/'))

});


//SERVER
gulp.task("srv", function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./src/scss/**/*.scss", ["scss"]).on("change", browserSync.reload);
  // gulp.watch("./src/scss/index.scss", ["scss"]).on("change", browserSync.reload);
  gulp.watch("./src/img/*.*", ["img"]).on("change", browserSync.reload);
  gulp.watch("./src/js/*.*", ["js"]).on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
  gulp.watch("./dist/style.min.css").on('change', browserSync.reload);
});


// IMAGE
gulp.task('img', function() {
    return gulp.src('./src/img/*.*')
            .pipe(imagemin({
                    interlaced: true,
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant()]
                  })
            )
            .pipe(gulp.dest('./dist/img'));
  });
  
  //CLEANER
  gulp.task('clean', function () {
    return gulp.src('./dist/', {read: false})
        .pipe(clean());
  });
  

  // !!!!!! FINAL BUILD
// gulp.task('dev', gulpSequence('clean', 'srv'));

gulp.task('build', gulpSequence('clean',["scss", "uglify", 'img'], ['copyCSS', 'copyJS'], 'srv') );

// gulp.task("default", ["dev"]);
