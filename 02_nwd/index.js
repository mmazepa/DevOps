/* jshint node: true, esversion: 6 */

const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

var nwd = (a, b) => {
  var q;
  while (b != 0) {
    q = a;
    a = b;
    b = q%b;
  }
  return a;
}

app.get('/:n1/:n2', (req, res) => {
  const val1 = req.params.n1;
  const val2 = req.params.n2;

  console.log('num1: ' + val1 + ', num2: ' + val2);

  const pair = Math.max(val1, val2) + "," + Math.min(val1, val2);

  client.get(pair, (err, result) => {
    if (result) {
      res.send('nwd(' + val1 + ',' + val2 + ') = ' + result + '\n');
    } else {
      result = nwd(val1, val2);
      client.set(pair, result);
      res.send('nwd(' + val1 + ',' + val2 + ') = ' + result + '\n');
    }
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081.');
});
