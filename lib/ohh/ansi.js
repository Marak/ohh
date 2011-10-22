var ansi = {}, 
    fs   = require('fs'),
    path = require('path');

var ansiPath = path.normalize(__dirname + '/../../content/ansi');
var content = fs.readdirSync(ansiPath);

content.forEach(function(script){
  var key = '/' + script.replace('.js', '');
  exports[key] = require(ansiPath + '/' + script);
});



