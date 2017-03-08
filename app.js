var fs = require('fs');
var example = require('./example');

function describe(text){
    return `describe("${text}", function () {});`
}

function it(text){
    return `it("${text}", function () {});`
}

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
// cant have more than one describe next to each other on the same level



// if the next node's level is less
    // add yourself to the chunk
    // designate the chunk an it
    // reset the chunk

// if the next node's level is the same
    // youre in the current chunk

// if the next node's level is one more
    // this current node must be describe
    // designate the existing chunk as its!

let chunk = [];
for(let counter = 0; counter <= nodes.length - 1; counter++){
    let decisionMade = false;
    let my = nodes[counter];
    if(counter + 1 === nodes.length){
        chunk.push(counter)
        console.log(counter, 'setting', chunk, 'as false')

        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        break;
    }
    if(nodes[counter + 1].level < my.level){
        decisionMade = true;
        chunk.push(counter);
        console.log(counter, 'setting', chunk, 'as false')
        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        chunk = [];
    }
    if(nodes[counter + 1].level > my.level) {
        decisionMade = true;
        my.describe = true;
        console.log(counter, 'setting', chunk, 'as true')
        nodes.slice(chunk[0], chunk[0] + chunk.length).forEach(node => {node.describe = false});
        chunk = [];
    }
    if(!decisionMade){
        chunk.push(counter);
        console.log('adding', counter, 'to chunk, it is now at', chunk)
        // console.log(chunk)
    }

}
console.log(nodes)


function printStuff(arr){
    if(arr.length === 0){
       return
    }
    if(arr[0].describe){
        //doA()
    } else {
        //doZ()
    }

    if(arr[0].describe){
        //doB()
    }
}



// example.forEach((e,i)=>{
//     let test = e.describe ? describe(e.text) : it(e.text);
//     fs.appendFile('example.spec.js', test + '\n')
// });
