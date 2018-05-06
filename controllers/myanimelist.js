const https = require('https');

module.exports.mal_for_user = function(mal_username, callback) {
  var options = {
    host: 'myanimelist.net',
    port: 443,
    path: '/animelist/' + mal_username + '/load.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  getJSON(options, callback)
}

var getJSON = function(options, onResult) {
  console.log("rest::getJSON");

  var port = options.port == 443 ? https : http;
  var req = port.request(options, function(res) {
    var output = '';
    console.log(options.host + ':' + res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      output += chunk;
    });

    res.on('end', function() {
      var obj = JSON.parse(output);
      onResult(res.statusCode, obj);
    });
  });

  req.on('error', function(err) {
    //res.send('error: ' + err.message);
  });

  req.end();
};