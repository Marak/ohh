var http = require("http");
var charmer = require("charm");

exports.handler = function (req, stream) {

  var charm = charmer(stream);

  var colors = {
    b: 'black',
    r: 'red',
    g: 'green',
    y: 'yellow',
    B: 'blue',
    m: 'magenta',
    c: 'cyan',
    w: 'white'
  };

  var frames = [
    [
      "wwwwwwwwwwwwwww",
      "wwwwwwbbbwwwwww",
      "wwwwwwmmmwwwwww",
      "wwwwwwmmmwwwwww",
      "wwwwwyyyyywwwww",
      "wwwwywyyywywwww",
      "wwwywwyyywywwww",
      "wwwwwwyyywwwwww",
      "wwwwwwgggwwwwww",
      "wwwwwwgggwwwwww",
      "wwwwwwgwgwwwwww",
      "wwwwwwgwgwwwwww",
      "wwwwwwgwwgwwwww",
      "wwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwww"
    ],
    [
      "wwwwwwwwwwwwwww",
      "wwwwwwbbbwwwwww",
      "wwwwwwmmmwwwwww",
      "wwwwwwmmmwwwwww",
      "wwwwwyyyyywwwww",
      "wwwyywyyywywwww",
      "wwwwwwyyywwywww",
      "wwwwwwyyywwwwww",
      "wwwwwwgggwwwwww",
      "wwwwwwgggwwwwww",
      "wwwwwwgwgwwwwww",
      "wwwwwwgwgwwwwww",
      "wwwwwgwwgwwwwww",
      "wwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwww"
    ]
  ];
  
  var draw = function(frame) {
    for(var i = 0; i < frame.length; i++) {
      for(var j = 0; j < frame[i].length; j++) {
        charm.background(colors[frame[i][j]])
        charm.write("  ");
        j == frame[i].length-1 && charm.write("\n");
      }
    }
    
    charm.move(-frame[0].length*2, -frame.length);
  }

  var count = 20;
  (function animate(id) {
    draw(frames[id]);

    if(count--) {
      setTimeout(function() { animate(count%2); }, 200);
    }
    else {
      charm.write("\n\nAll done!\n");
      stream.end();
    }
  })(0);

  stream.connection.on('close', function () {
      charm.destroy();
      stream.end();
  });
};

