var http = require("http");
var charmer = require("charm");

exports.handler = function (req, res) {

  var charm = charmer(res);

  var upswing = function (x,y) {
    charm.move(x-14,y-8).write([
      "   ▜▘         ",
      "   ▐    ☻     ",
      "    ▚▄█████▚  ",
      "      ▐███  ▐ ",
      " ▜▛   ▐███    ",
      " ▔▔   ▐  ▐    ",
      "      ▟  ▟    ",
      "              ",
      "  working...  " ].join("\n"));
  }

  var downswing = function (x,y) {
    charm.move(x-14,y-8).write([
      "              ",
      "*tink*  ☻     ",
      "  ▖  ▄█████▚  ",
      "  ▛▀▀ ▐███  ▐ ",
      " ▜▛   ▐███    ",
      " ▔▔   ▐  ▐    ",
      "      ▟  ▟    ",
      "              ",
      "  working...  " ].join("\n"));
  }

  var count = 20;
  upswing(14, 8);
  (function animate (up) {
    if (up) {
      upswing(0,0);
    } else {
      downswing(0,0);
    }
    if (count--) {
      setTimeout(function() { animate(!up); }, 500);
    } else {
      charm.write("\n\nAll done!\n");
      res.end();
    }
  })();
};