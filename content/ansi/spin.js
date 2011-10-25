var http = require('http');
var charmer = require('charm');


exports.handler = function(req, stream) {

    stream.setHeader('content-type', 'text/ansi');

    var charm = charmer(stream);
    charm.reset();

    var radius = 10;
    var theta = 0;
    var points = [];

    var iv = setInterval(function () {
        var x = 2 + (radius + Math.cos(theta) * radius) * 2;
        var y = 2 + radius + Math.sin(theta) * radius;
        
        points.unshift([ x, y ]);
        var colors = [ 'red', 'yellow', 'green', 'cyan', 'blue', 'magenta' ];
        
        points.forEach(function (p, i) {
            charm.position(p[0], p[1]);
            var c = colors[Math.floor(i / 12)];
            charm.background(c).write(' ')
        });
        points = points.slice(0, 12 * colors.length - 1);
        
        theta += Math.PI / 40;
    }, 50);
    
    stream.connection.on('close', function () {
        clearInterval(iv);
        charm.reset();
        charm.destroy();
        stream.end();
    });


}