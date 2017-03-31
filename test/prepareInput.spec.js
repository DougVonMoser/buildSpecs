const expect = require('chai').expect;
const prepareInput = require('../helpers/prepareInput');
const exampleSpecString = require('../fixtures/exampleSpecString');

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
            expect(prepared[0]).to.include.keys('describe', 'level', 'text');
        });
        describe("level property", function () {
            it("should be a number", function () {
                expect(prepared[0].level).to.be.a('number');
            });
            it("should accurately represent the level of that line", function(){
                let preparedLevel = prepared.map(e => e.level);
                expect(preparedLevel).to.deep.equal([0,1,1,1,2,1,2,2,2,2,1,2,2]);
            });
        });
        describe("text property", function () {
            it("should be a string", function () {
                expect(prepared[0].text).to.be.a('string');
            });
        });
        describe("describe property", function () {
            it("should always be true for now goddam it", function () {
                expect(prepared[0].describe).to.be.a('boolean');
            });
        });
    });
});
