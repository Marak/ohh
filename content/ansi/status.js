var http = require('http');
var charmer = require('charm');


exports.handler = function(req, stream) {

  var charm = charmer(stream);

  setInterval(function(){

    var mem = process.memoryUsage().rss.toString();
    charm.position(1 , 2);
    charm.write('Memory Usage: ' + mem + '\n');
    charm.display('reset');

  }, 200);


};