const expect = require('chai').expect;
const rankInput = require('../src/helpers/rankInput');

const preNodeArray = require('../fixtures/preDescribedNodeArray.js');
const postNodeArray = require('../fixtures/postDescribedNodeArray.js');

describe('prepare input', function(){
    let response = rankInput(preNodeArray);
    it('should do its damn job', function(){
       expect(response).to.deep.equal(postNodeArray);
    });
});