'use strict';
var tw = require('./textWalker');
var lsys = require('./lsys');
var $ = require('jquery');

function getRules(hot) {
    var rules = {};
    for (var i = 0; i < hot.countRows(); i++) {
        var symbol = hot.getDataAtCell(i, 0);
        var production = hot.getDataAtCell(i, 1);
        var enabled = hot.getDataAtCell(i, 2);
        if (symbol && enabled) {
            rules[symbol] = production;
        }
    }
    return rules;
}

function update(hot) {
    var depth = $('#depth').val();
    var sourceText = $('#source').val();
    var rules = getRules(hot);
    var seed = $('#seed').val();
    var instructions = lsys.applyRecursive(rules, seed, depth);
    var output = tw.walkTokens(sourceText.split(" "), instructions).join(" ");
    output = output.replace(/\n/g, "<br>");
    output = output.replace(/\t/g, "&nbsp;&nbsp;&nbsp;");
    $('#output').html(output);
    $('#instructions').html(instructions);
    $('#depthval').html(depth);
}

$(function() {
    var updateFromSourceText = false;
    var container = document.getElementById('rules');
    var hot = new Handsontable(container, {
        data: [
            {symbol: "P", production: "P[++NTP]-P", enabled: true},
            {symbol: "T", production: "TT", enabled: true},
            {symbol: "+", production: "++", enabled: true}
        ],
        minSpareRows: 1,
        rowHeaders: false,
        colHeaders: ["Symbol", "Production", "Enabled?"],
        columns: [
            {data: "symbol"},
            {data: "production"},
            {data: "enabled", type: "checkbox"}],
        contextMenu: true,
        persistentState: true
    });
    hot.addHook('afterChange', function(changes, source) {
        update(hot);
        localStorage['data'] = JSON.stringify(hot.getData());
    });
    hot.addHook('afterCreateRow', function(index) {
        var data = hot.getData();
        data[index - 1].enabled = true;
    });
    $('#depth').on('input', function() { update(hot); });
    $('#seed').on('input', function() {
        update(hot);
        localStorage['seed'] = $(this).val();
    });
    $('#source').on('input', function() {
        console.log("hey");
        updateFromSourceText = true;
    });

    // help pop-ups
    $('.help').on('click', function() {
        if ($(this).attr('id')) {
            var helpTextId = $(this).attr('id') + "-text";
            $("#"+helpTextId).toggle();
        }
    });
    $('.help-text').on('click', function() {
        $(this).toggle();
    });
    $('.togglewhatisthis').on('click', function() {
        $('#whatisthis').toggle();
    });

    // only update at most once every second from changes to textarea
    setInterval(function () {
        if (updateFromSourceText) {
            update(hot);
            updateFromSourceText = false;
        }
    }, 1000);

    // save data locally (writing those rules over and over again is a hassle!)
    if (localStorage["data"]) {
        hot.loadData(JSON.parse(localStorage["data"]));
    }
    if (localStorage["seed"]) {
        console.log(localStorage["seed"]);
        $('#seed').val(localStorage["seed"]);
    }
    update(hot);

});
