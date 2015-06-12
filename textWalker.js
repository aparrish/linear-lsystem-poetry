'use strict';
var _ = require('underscore');
var lsys = require('./lsys');

function wrapped(list, index) {
    return list[index % list.length];
}

function walkTokens(tokens, instructions) {
    var pos = 0;
    var output = [];
    var stack = [];
    _.each(instructions.split(''), function(ch) {
        switch (ch) {
            case 'P':
                output.push(wrapped(tokens, pos));
                pos++;
                break;
            case '+':
                pos++;
                break;
            case '-':
                pos--;
                break;
            case 'N':
                output.push('\n');
                break;
            case 'T':
                output.push('\t');
                break;
            case '[':
                stack.push(pos);
                break;
            case ']':
                pos = stack.pop();
                break;
        }
    });
    return output;
}

module.exports = {
    walkTokens: walkTokens
};
