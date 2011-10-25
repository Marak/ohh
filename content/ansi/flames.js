var http = require("http");
var charmer = require("charm");

var frames = [
  [
    "       ",
    " ▘     ",
    " ▝▖▞▝  ",
    "▝▖ ▐   ",
    "▚▜  ▗  ",
    " ▗ ▐▖▘ ",
    "▖▝▛▖▝▖ ",
    "▀ ▌▙▚  ",
    "▗▘▗▄▚▗ ",
    "▙▟█▄▙█▖"
  ].join("\n"),
  [
    "  ▖    ",
    " ▖     ",
    " ▜▖    ",
    "  ▄ ▖  ",
    "▄▐▘▞   ",
    "▘▞▗▛▝▖ ",
    "▝ ▛▄▗▖ ",
    "█▐▖▚▚▖ ",
    "▗▀▗▗▗▚ ",
    "▙▄▟▖▙█▖"
  ].join("\n"),
  [
    "  ▖    ",
    " ▐ ▝   ",
    "▝▖▗▖▝  ",
    " ▐ ▖▗  ",
    " ▜ ▌ ▄▘",
    "▖▗▗█▖▖ ",
    "▞▝▛▙▖▘ ",
    " ▄▘ ▛▖ ",
    "▟▘▄▗▌▙ ",
    "▙▟█▗▙█▖"
  ].join("\n"),
];


var mask = [
  [
    "       ",
    "  o o  ",
    "   o   ",
    "  o    ",
    "     o ",
    "  o o  ",
    "     o ",
    "    x  ",
    " xxxxx ",
    "xxxxxxx",
  ].join("\n"),

  [
    "    o  ",
    " o     ",
    "  o o  ",
    "       ",
    " o  o  ",
    "    o  ",
    " o     ",
    "  x  x ",
    " xxxx  ",
    "xxxxxxx",
  ].join("\n")
];


exports.handler = function(options, stream) {

  var charm = charmer(stream);
  charm.foreground("red");
  charm.push();

  var count = 0;
  (function draw () {
    if (count < 100) {
      charm.pop();

      var frame = frames[count % 3];
      Array.prototype.forEach.call(frame, function (c, i) {
        var j = count % 2;
        if (mask[j][i] === "x" || mask[j][i] === "o") {
          charm.push();
          if (mask[j][i] === "x") {
            charm.background("yellow");
          } else {
            charm.foreground("yellow");
          }
          charm.write(c);
          charm.display("reset");
          charm.pop().right(1).foreground("red");
        } else {
          charm.write(c);
        }
      });
      count++;
      //count=count%6;
      charm.move(-7, -9);
      charm.push();
      setTimeout(draw, 100);
    } else {
      charm.display("reset");
      charm.reset();
      charm.destroy();
      stream.end();
    }
  })();


  stream.connection.on('close', function () {
      charm.destroy();
      stream.end();
  });

};

