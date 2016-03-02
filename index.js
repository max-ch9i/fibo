#! /usr/bin/env node

var userArgs = process.argv.slice(2);

var params = [{
    pattern: /^--num=([\S]+)$/,
    title: 'depth'
}];

var paramValues = userArgs.map(arg => {
    var matched = params
        .map(param => ({matches: arg.match(param.pattern), param: param}))
        .filter(match => match.matches !== null);
    return matched[0] ? {name: matched[0].param.title, value: matched[0].matches[1]} : null;
}).filter(arg => arg !== null);

console.log(paramValues);
