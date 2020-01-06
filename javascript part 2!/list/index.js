#!/usr/bin/env node
const fs = require('fs');

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
    const stats = await allPromises;
    for(let stat of stats){
        const index = stats.indexOf(stat)
        console.log(filenames[index],(await stat).isFile())
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