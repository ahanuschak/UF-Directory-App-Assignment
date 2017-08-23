var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
	if (parsedUrl.path == "/listings"){
    response.writeHead(200, {'Content-Length': Buffer.byteLength(listingData),'Content-Type': 'text/plain'});
		response.write(listingData);
	}
	else{
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.end("Bad gateway error");
	}

};

fs.readFile('listings.json', 'utf8', function(err, data) {
	// a server is created, but not started
	server = http.createServer(requestHandler);
	// the server is now started, listening for requests on port 8080
	server.listen(port, function() {
	  //once the server is listening, this callback function is executed
	  console.log('Server listening on: http://127.0.0.1:' + port);
	});
	listingData = data;
});
