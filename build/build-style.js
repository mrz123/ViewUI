// gulp.src 和 gulp.dest 的路径可能需要调整，确保相对路径正确。
const gulp = require('gulp');
const { series } = require('gulp'); // 新增此行

const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    return gulp.src('../src/styles/index.less') // 确保入口文件正确 返回 Stream
        .pipe(less({
            javascriptEnabled: true, // 启用内联 JavaScript
            paths: ['../src/styles'] // 添加 Less 文件查找路径
        }))
        .on('error', console.error) // 捕获并输出编译错误
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'ie > 8'] // 更新 browsers 配置
        }))
        .pipe(cleanCSS())
        .pipe(rename('iview.css'))
        .pipe(gulp.dest('../dist/styles'))
        .pipe(gulp.dest('./temp'));
});

// 拷贝字体文件
/*gulp.task('fonts', function () {
    gulp.src('../src/styles/common/iconfont/fonts/!*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
.on('end', done);
});*/

gulp.task('fonts', function (done) { // 使用回调函数
    gulp.src('../src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'))
        .on('end', done); // 标记任务完成
});


// Gulp 4.x 不再支持通过数组定义任务依赖 需要改用 series 或 parallel
// gulp.task('default', ['css', 'fonts']);
// 修改 default 任务
gulp.task('default', series('css', 'fonts'));

