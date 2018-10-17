const should = require('should');

const {parse} = require('../');

describe('ResponseQL Grammar', function() {
    it('Should parse `a` props', () => {
        const result = parse('a');

        should(result).have.lengthOf(1);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(1);
        should(names).be.deepEqual(['a']);
    });

    it('Should parse `a_A1__` props', () => {
        const result = parse('a_A1__');

        should(result).have.lengthOf(1);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(1);
        should(names).be.deepEqual(['a_A1__']);
    });

    it('Should parse `{a}` props', () => {
        const result = parse('{a}');

        should(result).have.lengthOf(1);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(1);
        should(names).be.deepEqual(['a']);
    });

    it('Should parse `a, b` props', () => {
        const result = parse('a, b');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['a', 'b']);
    });

    it('Should parse `a, b,` props', () => {
        const result = parse('a, b,');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['a', 'b']);
    });

    it('Should parse `{a, b}` props', () => {
        const result = parse('{a, b}');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['a', 'b']);
    });

    it('Should parse `{a, b,}` props', () => {
        const result = parse('{a, b,}');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['a', 'b']);
    });

    it('Should parse `{a\\nb\\n}` props', () => {
        const result = parse('{a \n b \n}');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['a', 'b']);
    });

    it('Should parse `{owner { name } }` props', () => {
        const result = parse('{ owner {   name   }    }');

        should(result).have.lengthOf(1);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(1);
        should(names).be.deepEqual(['owner']);

        should(result[0]).be.deepEqual({
            name: 'owner',
            props: [{
                name: 'name',
                props: [],
            }],
        });
    });

    it('Should parse `{owner{name}, author{*}}` props', () => {
        const result = parse('{owner{name}, author{*}}');

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['owner', 'author']);

        should(result[0]).be.deepEqual({
            name: 'owner',
            props: [{
                name: 'name',
                props: [],
            }],
        });

        should(result[1]).be.deepEqual({
            name: 'author',
            props: true,
        });
    });

    it('Should parse multiline `{owner{name,email}, author{*}}` props', () => {
        const rule = `
            {
                owner {
                    name, email
                }
                author {
                    friends {*}
                }
            }
        `;
        const result = parse(rule);

        should(result).have.lengthOf(2);

        const names = result.map(({name}) => name);

        should(names).have.lengthOf(2);
        should(names).be.deepEqual(['owner', 'author']);

        should(result[0]).be.deepEqual({
            name: 'owner',
            props: [{
                name: 'name',
                props: [],
            },{
                name: 'email',
                props: [],
            }],
        });

        should(result[1]).be.deepEqual({
            name: 'author',
            props: [{
                name: 'friends',
                props: true,
            }],
        });
    });
});
