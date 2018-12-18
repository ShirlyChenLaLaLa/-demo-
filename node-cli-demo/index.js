#!/usr/bin/env node
// console.log('hello world');
// console.log(process.argv[2]);
// argv是个数组，前两位是固定的，分别是node程序的路径和脚本存放的位置
// npm社区中也有一些优秀的命令行参数解析包，比如yargs,tj的commander.js等等
// 如果你希望写一个项目打完包自动推上git的cli，或者自动从git仓库里面拉取项目启动模板，那么，你需要通过node的child_process模块开启子进程，在子进程内调用git命令：

//test.js
// const child_process = require('child_process');

// let subProcess=child_process.exec("git version",function(err,stdout){
//     if(err)console.log(err);
//     console.log(stdout);
//     subProcess.kill()
// });


// https://github.com/Marak/colors.js 

//index.js
const readline = require('readline');
const unloadChar='-';
const loadedChar='=';
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('你想对谁说声hello？ ',answer=>{
    let i = 0;
    let time = setInterval(()=>{
        if(i>10){
            clearInterval(time);
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            console.log(`hello ${answer}`);
            process.exit(0)
            return
        }
        readline.cursorTo(process.stdout,0,1);
        readline.clearScreenDown(process.stdout);
        renderProgress('saying hello',i);
        i++
    },200);
});

function renderProgress(text,step){
    const PERCENT = Math.round(step*10);
    const COUNT = 2;
    const unloadStr = new Array(COUNT*(10-step)).fill(unloadChar).join('');
    const loadedStr = new Array(COUNT*(step)).fill(loadedChar).join('');
    process.stdout.write(`${text}:【${loadedStr}${unloadStr}|${PERCENT}%】`)
}