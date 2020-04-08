/* jshint node: true, esversion: 6 */

const express = require('express');
const redis = require('redis');

const app = express();
const process = require('process');

const client = redis.createClient({
	host: 'redis-server',
	port: 6379
});

const factorial = (n) => {
	if (n == 0) {
		client.set(n, 1);
		return 1;
	} else {
		const result = (n * factorial(n-1));
		client.set(n, result);
		return result;
	}
};

app.get('/:number', (req, resp) => {
	const value = req.params.number;
	if (value >= 10) process.exit(1);

	client.get(value, (err, result) => {
		if (result == null || result == undefined)
			result = factorial(value);
		console.log('REQ: ' + value + ', RESP: ' + result);
		const answer = 'silnia(' + value + ') = ' + result;
		resp.send(answer + '\n');
	});
});

app.listen(8080, () => {
	console.log('Server listening on port 8080.');
});