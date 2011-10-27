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


var ANSIdom = require('ANSIdom').ANSIdom,
    http    = require('http'),
    fs      = require('fs');

var dom = new ANSIdom();

//
// Load a html template
//
var template = fs.readFileSync('./content/ANSIdom.html').toString();

dom.init(function(err){
  
  if (err) {
    throw err;
  }

  http.createServer(function(req, res){


    switch (req.url) {

      case '/':
        res.end(menu)
      break;

      case '/ANSIdom':
        //
        // Simple accept based routing, if text/html wasn't explicity sent,
        // respond with text/plain and ANSI codes
        //
        if(req.headers.accept.indexOf('text/html') === -1) {
          dom.render(template, res);
          res.end();
        } else {
          res.end(template);
        }

      break;

      default:
      if (ohh.ansi[req.url] && ohh.ansi[req.url].handler) {
        ohh.ansi[req.url].handler(req, res);
      } else {
        res.end('\n404 - No Page Found!\n\n');
      }      
      break;

    }


  }).listen(8000);


});



