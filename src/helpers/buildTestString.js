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

module.exports = function(nodes){
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
};
