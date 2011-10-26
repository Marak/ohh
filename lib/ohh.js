//
// animations with charm tend to leak memory,
// this require('kiwf') will restart the process at 200mbs of ram
//
require('kiwf')({
  "maxMemory":200000000
});

var ohh = {};

ohh = exports;

ohh.ansi = require('./ohh/ansi');

var http = require('http');

var menu = require('./ohh/menu').menu;


http.createServer(function(req, res) {
  
  res.setHeader('Content-Type', 'text/plain');


  switch(req.url) {

    case '/':
      res.end(menu)
    break;

    //
    // 404 Handler
    //
    default:
      if (ohh.ansi[req.url] && ohh.ansi[req.url].handler) {
        ohh.ansi[req.url].handler(req, res);
      } else {
        res.end('\n404 - No Page Found!\n\n');
      }
    break;
    
  }
  

  
}).listen(8000);