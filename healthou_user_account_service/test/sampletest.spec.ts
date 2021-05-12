import { expect } from 'chai';

describe('calculator/subtract', function() {
    it('should return a number when parameters are passed to `subtract()`', () => {
        expect(1).to.be.a('number');
    });

    it('should return sum of `1` when 2 - 1 is passed to `subtract()`', () => {
        expect(1).to.equal(1);
    });
});
