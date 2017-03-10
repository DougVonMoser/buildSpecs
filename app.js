var fs = require('fs');
var example = require('./example');

var text = fs.readFileSync("./stupid.spec.txt").toString('utf-8');

var textByLine = text.split("\n");

function findSpaces(str){
    let whatwewant = 0;
    str.split('').some((e,i)=>{
       if(e !== ' '){
           whatwewant = i;
           return true;
       }
    });
    return whatwewant;
}

let nodes = textByLine.map(text => {
    let numSpaces = findSpaces(text)
   return {
       level: numSpaces / 4,
       text: text.slice(numSpaces),
       describe: true
   }
});

let chunk = [];
for(let counter = 0; counter <= nodes.length - 1; counter++){
    let decisionMade = false;
    let my = nodes[counter];
    // if the next node's level is the same
    if(counter + 1 === nodes.length){
        chunk.push(counter)
        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        break;
    }
    // if the next node's level is less
    if(nodes[counter + 1].level < my.level){
        decisionMade = true;
        chunk.push(counter);
        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        chunk = [];
    }
    // if the next node's level is higher
    if(nodes[counter + 1].level > my.level) {
        // this current node must be describe
        decisionMade = true;
        my.describe = true;
        // designate the existing chunk as its

        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        chunk = [];
    }
    if(!decisionMade){
        chunk.push(counter);
    }

}

function describeA(node){
    return ' '.repeat(node.level * 4) + `describe("${node.text}", function () {\n`
}

function describeB(node){
    return ' '.repeat(node.level * 4) + `});\n`
}

function it(node){
    return ' '.repeat(node.level * 4) + `it("${node.text}", function () {\n\n` +
        ' '.repeat(node.level * 4) + `});\n`
}


function buildSpecs(){
    let describeStack = [];
    let finalString = '';

    nodes.forEach((node, idx)=>{
    if(node.describe){
        if(describeStack.length === 0 || node.level > describeStack[describeStack.length -1].level){
            describeStack.push(node);
            finalString += describeA(node)
        } else {
            while(describeStack.length && describeStack[describeStack.length -1].level >= node.level){
                finalString += describeB(describeStack.pop());
            }
            describeStack.push(node);
            finalString += describeA(node)
        }
    } else {
        finalString += it(node);
    }
    });
    describeStack.reverse().forEach((node)=>{finalString += describeB(node)});
    return finalString
}

fs.writeFileSync('./example.spec.js', buildSpecs());
