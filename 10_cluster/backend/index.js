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
const appPort = 3000;

const appName = `AppId: ${appId}`;

app.get('/', (req, res) => {
  return res.send(appName);
});

app.post('/', (req, res) => {
  const { key } = req.body;
  redisClient.get(key, (err, value) => {
    if (err) {
      console.log(err);
      return res.send(`${appName}: Wystąpił błąd!`);
    }
    if (value !== null) {
      return res.send(`${appName}: Znaleziono w cache!`);
    }
    redisClient.set(key, "");
    return res.send(`${appName}: Dodano do cache!`);
  });
});

app.listen(appPort, () => {
  console.log(`Backend listening on port ${appPort}.`);
});
