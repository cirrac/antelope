/*
 * Serve test JSON
 */

module.exports = function(app) {
	var fs = require('fs');

	app.get('/test.:format?', function(req, res) {

		var responseType = getResponseType(req);

		if (responseType == 'json')
			res.sendfile('./data/test.json');
		else if (responseType == 'xml')
			res.sendfile('./data/test.xml');
		else
			res.sendfile('./data/test.json');

	});

}

getResponseType = function(req) {
	var requestType = req.get('Content-Type');
	var responseType = '';

	if (req.params.format == 'json')
		responseType = 'json';
	else if (/application\/json;/.test(req.get('accept')))
		responseType = 'json';
	else if (requestType === 'application/json')
		responseType = 'json';
	else if (req.params.format == 'xml')
		responseType = 'xml';
	else if (/application\/xml;/.test(req.get('accept')))
		responseType = 'xml';
	else if (requestType === 'application/xml')
		responseType = 'xml';
	else
		responseType = 'json';
	return responseType;
}