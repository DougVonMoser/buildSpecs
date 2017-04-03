const sinon = require('sinon');
const expect = require('chai').expect;

const buildTestString = require('../src/helpers/buildTestString');
const rankedNodeArray = require('../fixtures/rankedNodeArray');
const finalstringOutput = require('../fixtures/finalStringOutput');

describe('buildTestString.js', function(){
    let result;

    before(function(){
        result = buildTestString(rankedNodeArray);
    });

    it('exports a string i guess', function(){
        expect(result).to.be.a('string');
    });

    it('does its fucking job', function(){
        expect(result).to.equal(finalstringOutput);
    });
});