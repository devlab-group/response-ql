const should = require('should');
const {parse, toMap} = require('../');

describe('toMap', function() {
    it('Should convert parsed options to map', function() {
        str = `
            user{id},post
        `;

        const result = toMap(parse(str));

        should(result).be.instanceOf(Map);
        should(result.has('user')).equals(true);
        should(result.has('post')).equals(true);

        should(result.get('user')).be.instanceOf(Map);
        should(result.get('user').has('id')).equals(true);

        should(result.get('post').size).equals(0);
    });
});
