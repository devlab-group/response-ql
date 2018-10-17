const parse = require('./parser.js');
const toMap = require('./to-map.js');

function rqlToMap(str) {
    return toMap(parse(str));
};

module.exports = rqlToMap;
rqlToMap.parse = parse;
rqlToMap.toMap = toMap;
