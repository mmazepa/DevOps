const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const redis = require('redis');

const app = express();
app.use(bodyParser.json());

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000
});

const appId = uuidv4();
const appPort = 5000;

app.get('/', (req, res) => {
  return res.send(`[${appId}] Hello from backend app!`);
});

app.listen(appPort, () => {
  console.log(`Backend listening on port ${appPort}.`);
});
