@{%

// Flatten array of any depth
function flatten(...args) {
  return args.reduce((result, item) => {
    if (Array.isArray(item)) {
      return [...result, ...flatten(...item)];
    }
    else {
      return [...result, item];
    }
  }, []);
}

function nest(list, ...nests) {
  const n = nests[0];

  if (nests.length > 1) {
    const tail = nests.slice(1);
    return list.reduce((result, item) => {
      if (Array.isArray(item)) {
        return [
          ...result,
          ...nest(item, tail),
        ];
      }
      else {
        return result;
      }
    }, []);
  }
  else {
    return list.map((item) => {
      return item[n] || [];
    });
  }
}

function token(type, value) {
  return {type, ...value};
}

function prop(name, props = null) {
  return {name, props};
}

function str(value) {
  if (Array.isArray(value)) {
    return flatten(value).join('');
  }
  else {
    value;
  }
}

%}

main -> __ "{" __ Props __ "}" __ {% (data) => data[3] %}
  | __ Props __ {% (data) => flatten(data[1]) %}

# Props List
Props -> Prop ( __ PropSep __ Prop):* PropSep:? {%
  data => flatten(data[0], nest(data, 1, 3))
%}

# Property
Prop -> PropName {%
      (data) => prop(str(data[0]), [])
    %}
  | PropName __ "{" __ Props __ "}" {%
      (data) => prop(str(data[0]), data[4])
    %}
  | PropName __ "{" __ "}" {%
      (data) => prop(str(data[0]), [])
      %}
  | PropName __ "{" __ "*" __ "}" {%
      (data) => prop(str(data[0]), true)
    %}

# PropName
PropName -> [A-Za-z0-9_]:+ {% id %}

PropSep -> ","
  | "\r"
  | "\n"

__ -> _:* {% flatten %}

_ -> " "
  | "\r"
  | "\n"
  | "\t"
