'use strict';
var _ = require('underscore');

function applyRules(rules, str) {
    return _.map(str.split(''), function(ch) {
        if (_.has(rules, ch)) {
            return rules[ch];
        }
        else {
            return ch;
        }
    }).join('');
}

function applyRecursive(rules, axiom, depth) {
    var production = axiom;
    for (var i = 0; i < depth; i++) {
        production = applyRules(rules, production);
    }
    return production;
}

module.exports = {
    applyRules: applyRules,
    applyRecursive: applyRecursive
};
