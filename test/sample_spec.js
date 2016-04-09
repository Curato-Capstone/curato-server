import { expect } from 'chai';

describe('Sample Test', () => {
    it('does something', () => {
        expect([].length).to.equal(0)
    });

    it('does something asynchronously', () => {
        expect(Promise.resolve(2 + 2)).to.eventually.equal(4);
    })
});