var ansi = {}, 
    fs   = require('fs'),
    path = require('path');

var ansiPath = path.normalize(__dirname + '/../../content/ansi');
var content = fs.readdirSync(ansiPath);

content.forEach(function(script){
  var baseName = path.basename(script);
  if (baseName[0] != '.' && baseName.substr(-3) == '.js') {
    var key = '/' + script.replace('.js', '');
    exports[key] = require(ansiPath + '/' + script);
  }
});



