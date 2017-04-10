#!/Users/douglasvonmoser/n/bin/node

const buildSpecs = require('./src');
const fs = require('fs');





// let file = process.env.PWD + '/' + process.argv[2];
// fs.lstatSync(file).isFile();
//
// buildSpecs(file);


// get all files and folders of root repo directory
// add *.spec.js files to a bucket
// run script on each spec.js file

var readdirs = require('recursive-readdir');

function myReadDirs(path){
    return new Promise(function(resolve, reject){
        readdirs(path, ['node_modules', '.git', '.idea'],function (err, files) {
            if(!err){
                resolve(files)
            }
        });
    })
}

let cliArg = process.argv[2] ? process.argv[2] : '.';
cliArg = process.env.PWD + '/' + cliArg;

myReadDirs(cliArg)
    .then(files => {
        files = files.filter(file => file.slice(-8) === '.spec.js');
        files.forEach(buildSpecs);
    });

