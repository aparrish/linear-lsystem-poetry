'use strict';
var test = require('tape');
var tw = require('textWalker');
var lsys = require('lsys');

test('walk a text', function(t) {
    var text = "The quick brown fox jumps over a lazy dog";
    var rules = {'P': 'P+P'};
    var instructions = lsys.applyRecursive(rules, 'P', 2);
    t.equal(
        tw.walkTokens(text.split(' '), instructions).join(" "),
        "The brown jumps a");
    rules = {'P': 'PP--P'}
    var instructions = lsys.applyRecursive(rules, 'P', 2);
    t.equal(
        tw.walkTokens(text.split(' '), instructions).join(" "),
        "The quick The quick brown quick The quick The");
    rules = {'P': 'P[++P]-P'}
    var instructions = lsys.applyRecursive(rules, 'P', 2);
    t.equal(
        tw.walkTokens(text.split(' '), instructions).join(" "),
        "The fox The fox a fox The fox The");
    rules = {'P': 'PNP'}
    var instructions = lsys.applyRecursive(rules, 'P', 2);
    t.equal(
        tw.walkTokens(text.split(' '), instructions).join(" "),
        "The \n quick \n brown \n fox");
    t.end();
});
