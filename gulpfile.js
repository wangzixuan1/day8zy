var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var url = require('url');
var fs = require('fs');
var path = require('path');
var swiper = require('./moke/swiper.json');
var list = require('./moke/list.json');
//编译，压缩css
gulp.task('mincss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'));
});
//起服务的函数
function Server(pagurl) {
    return gulp.src(pagurl)
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico' || pathname === '/js/libs/swiper.min.js.map') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify({ code: 1, mag: swiper }))
                } else if (pathname === '/api/list') {
                    var query = url.parse(req.url, true).query;
                    var limit = query.limit;
                    var sum = query.sum;
                    var data = list.slice((limit - 1) * sum, sum * limit);
                    res.end(JSON.stringify({ code: 1, mag: data }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, pagurl, pathname)));
                }
            }
        }))
}
//监听
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('mincss'));
});
//起服务
gulp.task('server', function() {
    Server('src');
});
//运行
gulp.task('dev', gulp.series('mincss', 'server', 'watch'));
//打包js
gulp.task('buildjs', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});
//打包css
gulp.task('buildcss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('build/css'));
});
//打包libs的文件
gulp.task('buildlibs', function() {
    return gulp.src('./src/js/libs/*.js')
        .pipe(gulp.dest('build/js/libs'))
});
gulp.task('buildhtml', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('build'))
});
//起服务
gulp.task('buildserver', function() {
    return Server('build');
});
//运行
gulp.task('build', gulp.series('buildjs', 'buildcss', 'buildhtml', 'buildlibs', 'buildserver'));