var ohh = require('../ohh'), 
    colors = require('colors');

var m = [];

m.push('');
m.push('try curling any of these urls:');
m.push('');

Object.keys(ohh.ansi).forEach(function(key){
  m.push('  curl ohh.io' + key);
});

m.push('  curl ohh.io/ANSIdom');
m.push('');
m.push('');
m.push('contribute @ github.com/marak/ohh');
m.push('powered by nodejitsu');
m.push('');
m.push('');


m = m.join('\n');

exports.menu = m;
