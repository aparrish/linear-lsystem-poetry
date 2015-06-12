'use strict';
var test = require('tape');
var lsys = require('../lsys');

test('apply rules', function(t) {
    var rules = {'1': '11', '0': '1[0]0'};
    t.equal(lsys.applyRules(rules, '1'), '11');
    t.equal(lsys.applyRules(rules, '0'), '1[0]0');
    t.equal(lsys.applyRules(rules, '1[0]0'), '11[1[0]0]1[0]0');
    t.end();
});

test('apply recursively', function(t) {
    var rules = {'1': '11', '0': '1[0]0'};
    t.equal(lsys.applyRecursive(rules, '0', 2), '11[1[0]0]1[0]0');
    t.end();
});
