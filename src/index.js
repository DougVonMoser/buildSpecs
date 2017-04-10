const fs = require('fs');

const buildTestString = require('./helpers/buildTestString');
const rankInput = require('./helpers/rankInput');
const prepareInput = require('./helpers/prepareInput');


function getText(arr){
    return arr.reduce((prev, curr)=>{
        return prev + curr + '\n'
    }, '');
}

module.exports = function(txtFileStr){
    let text = fs.readFileSync(txtFileStr).toString('utf-8');

    let response = prepareInput(text);
    if(!response.nodes){
        return;
    }

    rankInput(response.nodes);
    let stringToWrite = '';

    stringToWrite += getText(response.raw.slice(0, response.startBuildNum +1));
    stringToWrite += buildTestString(response.nodes);
    stringToWrite += getText(response.raw.slice(response.endBuildNum))

    fs.writeFileSync(txtFileStr, stringToWrite);
    return;
};