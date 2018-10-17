module.exports = toMap;

function toMap(props) {
    const result = new Map();
    props.forEach(({name, props}) => {
        if (Array.isArray(props)) {
            result.set(name, toMap(props));
        }
        else {
            result.set(name, props);
        }
    });
    return result;
};
