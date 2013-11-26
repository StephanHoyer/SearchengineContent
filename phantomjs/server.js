var system = require('system');
var server = require('webserver').create();
var pages = require('webpage');
var results = {};

var FORCE_TIMEOUT_MS = 3000;

if (system.args.length < 3) {
  console.log("Missing arguments.");
  phantom.exit();
}

var port = parseInt(system.args[1], 10);
var urlPrefix = system.args[2];

var renderHtml = function(url, renderDone) {
  console.log(url);
  if (results[url]) {
    return renderDone(results[url]);
  }
  var page = pages.create();
  var forceSendTimeout;
  var send = function() {
    results[url] = page.content;
    renderDone(page.content);
    clearTimeout(forceSendTimeout);
    page.close();
  };
  forceSendTimeout = setTimeout(send, FORCE_TIMEOUT_MS);
  console.log(JSON.stringify(page.settings));
  page.settings.loadImages = false;
  page.settings.loadStyles = false;
  page.settings.localToRemoteUrlAccessEnabled = true;
  page.onCallback = send;
  page.onConsoleMessage = function(msg, lineNum, sourceId) {
    console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
  };
  page.open(url);
};

server.listen(port, function (req, res) {
  var url = req.url.slice(1);
  renderHtml(urlPrefix + url, function(html) {
    //res.statusCode = 200;
    res.write(html);
    res.close();
  });
});

console.log('Listening on ' + port + '...');
console.log('Press Ctrl+C to stop.');
