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
    for(let filename of filenames){
        const stats = await lstat(filename);

        console.log(filename,stats.isFile())
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