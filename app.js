#!/Users/douglasvonmoser/n/bin/node

const buildSpecs = require('./src');
const fs = require('fs');




let file = process.env.PWD + '/' + process.argv[2];
fs.lstatSync(file).isFile();

buildSpecs(file);


// get all files and folders of root repo directory
// add *.spec.js files to a bucket
// run script on each spec.js file
