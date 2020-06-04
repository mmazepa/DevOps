const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const redis = require('redis');
const keys = require('./keys');

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const appId = uuidv4();
const appPort = 5000;

console.log(keys);

app.get('/', (req, res) => {
  return res.send(`[${appId}] ${keys.initMessage}`);
});

app.listen(appPort, () => {
  console.log(`Backend listening on port ${appPort}.`);
});
