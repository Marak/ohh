var http = require("http");
var charmer = require("charm");

var colors = [ 'red', 'blue', 'yellow', 'green', 'cyan' ];

exports.handler = function (req, stream) {
	var charm = charmer(stream);
	var frames = [
	"                                                                ",
	"                        ██                                      ",
	"                        ██                 ██                   ",
	"  ████████ ███████ ███████ ███████ ██ ██ ██████ ██████ ██   ██  ",
	"   ██   ██ ██   ██ ██   ██ ██   ██ ██ ██   ██   ██     ██   ██  ",
	"   ██   ██ ██   ██ ██   ██ ███████ ██ ██   ██   ██████ ██   ██  ",
	"   ██   ██ ██   ██ ██   ██ ██      ██ ██   ██       ██ ██   ██  ",
	"   ██   ██ ███████ ███████ ███████ ██ ██   ████ ██████ ████████ ",
	"                                   ██                           ",
	"                                 ████                           ",
	"                                                                " ];

	var draw = {
		curWidth: 1,
		curHeight: 10,
		_start: function () {
			for (var i = 0; i <= this.curHeight; i++) {
				charm.foreground(colors[1]).write(frames[i].substring(0, this.curWidth) + "\n");
				
			}
			this.curWidth++;
			for ( var i = 0; i <= this.curHeight; i++ ) {
				charm.move(this.curWidth, -10).write(frames[i].substring(this.curWidth-1, this.curWidth) + "\n");
			}
		},
		_end: function () {
			charm.reset().down(1).foreground(colors[0]).write(frames.join("\n"));
		}
	};
	
	var animate = {
		_start: function () {
			if (draw.curWidth <= 64) {
				setTimeout(function(){
					draw._start();
					animate._start();
				}, 50);	
			}
			if (draw.curWidth == 65) {
				draw._end();
			}
		}
	};

	(function kickoff () {
		animate._start();
	})();

  stream.connection.on('close', function () {
      charm.destroy();
      stream.end();
  });

};