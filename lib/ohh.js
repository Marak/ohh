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
  
  req.connection.on('end', function () {
    console.log('close');
    res.end();
  });
  
  
}).listen(8000);

