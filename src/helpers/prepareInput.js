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

module.exports = function(text){
    let lineArray = text.split("\n");
    let raw = lineArray.slice();
    lineArray = lineArray
        .map((text, ind) => {
            let numSpaces = findSpaces(text);
            return {
                level: numSpaces / 4,
                text: text.slice(numSpaces),
                lineNumber: ind + 1
            }
        })
        .filter(elem => elem.text.length > 2);

    // find where /* build starts and ends and return the inbetween
    let startBuildNum = lineArray.reduce((prev, line, ind) =>{
        if(prev !== null) {
            return prev;
        }
        if(line.text === '/*bS') {
            return ind;
        }
        return null;
    }, null);

    let endBuildNum = lineArray.reduce((prev, line, ind) =>{
        if(prev) {
            return prev;
        }
        if(line.text === 'bS*/') {
            return ind;
        }
        return null;
    }, null);

    if(startBuildNum === null){
        return {
            response: null,
        }
    } else {//
        return {
            nodes: lineArray.slice(startBuildNum + 1, endBuildNum),
            startBuildNum,
            endBuildNum,
            raw,
        };
    }
};