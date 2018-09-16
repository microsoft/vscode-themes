var http 	= require('http');
var redis	= require('redis');
var fs		= require('fs');

module.exports.start = function(opts) {

	"use strict";

	var client = redis.createClient(opts.redisPort || 6379);
	opts.redisPass && client.auth(opts.redisPass);

	http.createServer(function(request, response) {
	
		var route 	= request.url;
		var code	= 404;
		
		if(route === "/test") {
			response.writeHead(200, {
				"content-type" : "text/html"
			});
			return fs.createReadStream('./test.html').pipe(response);
		}
	
		if(route === "/fingerprint") {
			response.writeHead(200, {
				"content-type" : "text/javascript"
			})
			return fs.createReadStream('./fingerprint.js').pipe(response);	
		}
		
		if(route.indexOf('/log/') === 0) {
		
			var fingerprint = route.match(/^\/log\/(.*)/)[1];
			
			code = 204;
			
			if(fingerprint) {
				client.pfadd('anonymous:uniques', fingerprint);
			} else {
				code = 400;
			}
		}
		
		if(route === "/count") {
			return client.pfcount('anonymous:uniques', function(err, count) {
				if(err) {
					count = -1;
				}
				
				response.writeHead(200, {
					"content-type" : "application/json"
				})
				
				return response.end(JSON.stringify({
					count: count
				}))
			})
		}
		
		response.writeHead(code);
		response.end();
	
	}).listen(opts.port || 8080)
}


		
