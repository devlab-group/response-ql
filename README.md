# Response QL

Is extra lightweight implementation of Query Language for web applications. It
supports direct fields only without any extra behavior.

Let's select all friends props for user:

```
{
  user {
    name, friends{*}
  }
}
```

Each entity has required fields which will be returned in any way, such an ID,
so there is no reason to specify them. If passed asterisk `{*}` then all
properties will be extracted.

## Install

Via npm:

```shell
npm i response-ql
```

## Usage

```javascript
const parse = require('response-ql');

parse('user{location}'); // -> Map {"user" => Map {"location" => null}}
parse.parse('user{location}'); // -> [{name: 'user', props:[{name: 'location', props: null}]}]
```

Example output:

```javascript
[{
  name: 'user',
  props: [{
    name: 'location',
    props: null
  }]
}]
```


## Single line

When properties follow in one line it should be separated with comma.

```
user{name, email, birthday, city, cars{*}}
```

## Multiline

When properties separated with new line, comma _could_ be omitted:

```
user {
  name, email
  birthday
  city
  cars{*}
}
```

# License

MIT.
