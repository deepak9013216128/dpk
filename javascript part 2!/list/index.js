#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
// Method #2
// const util = require('util')
// const lstat = util.promisify(fs.lstat)

// Method #3
const {lstat} = fs.promises;

fs.readdir(process.cwd(), async (err,filenames)=>{
    if(err){
        console.log(err);
        return err;
    }
    const allPromises = filenames.map(filename => (lstat(filename)))
    const stats = await Promise.all(allPromises);
    for(let stat of stats){
        const index = stats.indexOf(stat)
        if(stat.isFile()){
            console.log(filenames[index])
        }else{
            console.log(chalk.bold(filenames[index]))
        }
    }
})
// Method #1
// const lstat = (filename)=>{
//     return new Promise((resolve,reject)=>{
//         fs.lstat(filename,(err,stats)=>{
//             if(err){
//                 reject(err);
//             }
//             resolve(stats);
//         });
//     });
// };