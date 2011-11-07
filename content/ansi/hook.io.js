var charmer = require('charm');

var frame = [
  "    __    __    ______     ______    __  ___         __    ______  ",
  "   |  |  |  |  /  __  \\   /  __  \\  |  |/  /        |  |  /  __  \\ ",
  "   |  |__|  | |  |  |  | |  |  |  | |  '  /         |  | |  |  |  |",
  "   |   __   | |  |  |  | |  |  |  | |    <          |  | |  |  |  |",
  "   |  |  |  | |  `--'  | |  `--'  | |  .  \\    __   |  | |  `--'  |",
  "   |__|  |__|  \\______/   \\______/  |__|\\__\\  (__)  |__|  \\______/ ",
  "                                                                   "
];

var width = frame[0].length,
    height = frame.length;

exports.handler = function (req, stream) {
  var charm = charmer(stream),
      colors = ["red", "yellow", "green", "blue", "magenta"],
      status = 0;

  function draw(x, y) {
    x == undefined && (x = 0);
    y == undefined && (y = 0);

    var rainbow = colors.slice(status).concat(colors.slice(0, status));

    charm.move(x - width, y - height);
    frame.forEach(function (line, index) {
      charm.foreground(rainbow[index % rainbow.length]).write(line + "\n");
    });
    ++status;
    status = status % colors.length;
  }

  draw(width, height);
  setInterval(draw, 200);

  stream.connection.on('close', function () {
    charm.destroy();
    stream.end();
  });
};

