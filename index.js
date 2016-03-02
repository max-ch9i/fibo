#! /usr/bin/env node

var userArgs = process.argv.slice(2);

var params = [{
    pattern: /^--num=([\S]+)$/,
    title: 'depth'
}];

// Parse arguments
// Return [ {name: 'depth', value: 10} ]
var paramValues = userArgs.map(arg => {
    var matched = params
        .map(param => ({matches: arg.match(param.pattern), param: param}))
        .filter(match => match.matches !== null);
    return matched[0] ? {name: matched[0].param.title, value: matched[0].matches[1]} : null;
}).filter(arg => arg !== null);

function* fibonacci() {
    var first = 0,
        second = 1;

    yield first; yield second;

    while(true) {
        var third = first + second;
        yield third;
        first = second;
        second = third;
    }
}

var fibo = fibonacci();

var depthParam = paramValues.filter(param => param.name === 'depth').shift();
var depth = depthParam ? depthParam.value : 10;

function printFibValue(n) {
    console.log(fibo.next().value);

    if (n > 0) {
        printFibValue(n-1);
    }
}

printFibValue(depth);
