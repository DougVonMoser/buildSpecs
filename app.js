var fs = require('fs');

const buildTestString = require('./helpers/buildTestString');
const rankInput = require('./helpers/rankInput');
const prepareInput = require('./helpers/prepareInput');

var text = fs.readFileSync("./test/fixtures/inputExample.txt").toString('utf-8');
let nodes = prepareInput(text);

rankInput(nodes);

fs.writeFileSync('./outputExample.spec.js', buildTestString(nodes));
