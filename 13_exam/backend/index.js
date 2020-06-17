const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./keys');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.connect(err => {
  if (err) console.error('[PG_LOG]: Connection error!', err.stack)
  else console.log('[PG_LOG]: Connected!')
});

pgClient.on('error', () => {
  console.log('No connection to PG DB');
});

pgClient.query('CREATE TABLE IF NOT EXISTS fibonacci(key INT, value BIGINT)')
  .catch(err => {
    console.log(err);
  }
);

const memoFib = () => {
  var memo = [0, 1];
  fib = (n) => {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n-1) + fib(n-2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
};

const addResult = (key, value) => {
  return new Promise((resolve, reject) => {
    pgClient
      .query("INSERT INTO fibonacci (key, value) VALUES ($1,$2)", [key, value])
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  })
}

app.get("/results", (req, resp) => {
  console.log("GET request...");

  pgClient
    .query("SELECT DISTINCT key, value FROM fibonacci ORDER BY key ASC")
    .then((data) => {
      return resp.status(200).json(data.rows);
    }).catch((err) => {
      console.log(err);
      return resp.status(500);
    });
});

app.post("/results", (req, resp) => {
  console.log("POST request... (" + req.body.number + ")");

  const num = parseInt(req.body.number);
  const key = `${num}`;

  redisClient.get(key, async (err, value) => {
    try {
      if (value != null) {
        await addResult(key, value);
        return resp.status(200).json({ number: key, result: value});
      }
      const result = memoFib()(key);
      console.log("Nowy Wynik: " + result);
      redisClient.set(key, result);
      await addResult(key, result);
      return resp.status(200).json({ number: key, result: result});
    } catch (err) {
      console.log(err);
      return resp.status(500);
    }
  });
});

const appId = uuidv4();
const appPort = 5000;

console.log(keys);

app.get('/', (req, resp) => {
  return resp.send(`[${appId}] Hello from k8s cluster backend!`);
});

app.listen(appPort, err => {
  console.log(`Backend listening on port ${appPort}.`);
});
