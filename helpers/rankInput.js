module.exports = function(nodes){

    let chunk = [];
    for(let counter = 0; counter <= nodes.length - 1; counter++){
        let decisionMade = false;
        let my = nodes[counter];
        // if the next node's level is the same
        if(counter + 1 === nodes.length){
            chunk.push(counter);
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
    return nodes
};