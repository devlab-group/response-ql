const {Parser, Grammar} = require('nearley');

const grammar = require('./grammar.js');

module.exports = function parse(string) {
    const parser = new Parser(Grammar.fromCompiled(grammar));
    parser.feed(string);
    return parser.results[0];
};
