var fs = require('fs');

const buildTestString = require('./helpers/buildTestString');
const rankInput = require('./helpers/rankInput');
const prepareInput = require('./helpers/prepareInput');


module.exports = function(txtFileStr){
    let text = fs.readFileSync(txtFileStr).toString('utf-8');
    let nodes = prepareInput(text);
    rankInput(nodes);
    return buildTestString(nodes);
};