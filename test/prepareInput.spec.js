const expect = require('chai').expect;
const prepareInput = require('../src/helpers/prepareInput');
const exampleSpecString = require('../fixtures/exampleSpecString');
const preparedFixture = require('../fixtures/correctlyPreparedInput');


describe('prepare input', function(){
    it('should export a function',function(){
        expect(prepareInput).to.be.a('function');
    });
    describe("when passed a txt file string returns an array", function () {
        let prepared;
        before(function(){
            prepared = prepareInput(exampleSpecString);
        });


        it("each line should have 3 properties", function () {
            expect(prepared.nodes[0]).to.include.keys('level', 'text', 'lineNumber');
        });

        it("the response object has 4 properties", function(){
            expect(prepared).to.include.keys('nodes', 'startBuildNum', 'endBuildNum', 'raw');
        });

        describe("level property", function () {
            it("should be a number", function () {
                expect(prepared.nodes[0].level).to.be.a('number');
            });
            it("should accurately represent the level of that line", function(){
                let preparedLevel = prepared.nodes.map(e => e.level);
                expect(preparedLevel).to.deep.equal([0,1,1,1,2,1,2,2,2,2,1,2,2]);
            });
        });
        describe("text property", function () {
            it("should be a string", function () {
                expect(prepared.nodes[0].text).to.be.a('string');
            });
        });

        describe("the nodes property", function(){
            it("should include only and all specs to build", function(){
                expect(prepared).to.deep.equal(preparedFixture)
            });
        })
    });
});
//
