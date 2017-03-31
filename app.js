const buildSpecs = require('./src');
const fs = require('fs');

//soon to be piped into via command line or
// applied to front end crap
let txtBuildFile = "./fixtures/inputExample.txt";

fs.writeFileSync('outputExample.spec.js', buildSpecs(txtBuildFile));
