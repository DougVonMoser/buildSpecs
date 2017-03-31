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
    return text.split("\n").map(text => {
        let numSpaces = findSpaces(text);
        return {
            level: numSpaces / 4,
            text: text.slice(numSpaces)
        }
    });
};