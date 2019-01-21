let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json');
let exec = require('child_process').exec;
// let uglify = require('gulp-uglify');
let child;

const PATHS = {
    scripts: ['./routes/*.ts'],
    output: './build'
}

//压缩js文件
// 在命令行使用gulp script启动此任务

// gulp.task('script',function() {
//     gulp.src('routes/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(PATHS.output))
// })

//编译ts文件
gulp.task('build-ts', ['restart'], function () {
    return gulp.src(PATHS.scripts)
        .pipe(tsp())  // pipe()的意思是 下个处理程序可以把上一级输出的流文件当做输入
        .pipe(gulp.dest(PATHS.output));
});

//监视ts文件变化
gulp.task('watch-ts', ['build-ts'], function () {
    gulp.watch(PATHS.scripts, ['build-ts']);
});

//自动重启服务器
gulp.task('restart', function () {
    child = exec('supervisor -w build ./build/server.js', (error, stdout, stderr) => {
        console.log(`stdout:${stdout}`);
        console.log(`stderr:${stderr}`);
        if (error !== null) {
            console.log(`exec error:${error}`);
        }
    });
})

gulp.task('dev', ['build-ts', 'restart', 'watch-ts'])