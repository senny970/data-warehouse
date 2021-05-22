const { task, src, watch, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const spritesmith = require('gulp.spritesmith');

sass.compiler = require('node-sass');

function scss() {
    return src('src/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
}

function imgmin() {
    return gulp.src('src/assets/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

function generateSprite() {
    const spriteData = gulp.src('src/assets/sprites/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../images/sprite.png',
            cssName: '_sprite.scss',
            padding: 5
        }));

    const imgStream = spriteData.img
        .pipe(gulp.dest('src/assets/images'));

    const cssStream = spriteData.css
        .pipe(gulp.dest('src/scss/mixins'));

    return merge(imgStream, cssStream);
}

function fontsFontAwesome() {
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(dest('dist/fonts'))
}

task('getFontAwesome', fontsFontAwesome);

task('watch', () => {
    scss();
    imgmin();
    generateSprite();

    watch('src/assets/sprites/*.*', generateSprite);
    watch('src/assets/images/*.*', imgmin);
    watch('src/scss/**/*.scss', scss);
});