const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on('error', () => {
  console.log('No connection to PG DB');
});

pgClient.query('CREATE TABLE IF NOT EXISTS fibonacci(key INT, value INT)').catch(err => { 
    console.log(err);
});

console.log(keys);

const fib = (num) => {
  if (num <= 0) return 0;
  else if (num == 1) return 1;
  else return (fib(num-1) + fib(num-2));
}

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
      return resp.json(data.rows);
    }).catch((err) => {
      console.log(err);
      return resp.status(500);
    });
});

app.post("/results", (req, resp) => {
  console.log("POST request... (" + req.body.param1 + ")");

  const num = parseInt(req.body.param1);
  const key = `${num}`;

  redisClient.get(key, async (err, value) => {
    try {
      if (value != null) {
        await addResult(key, value);
        return resp.send("Fibonacci: fib(" + `${key}` + ") = " + `${value}` + "\n");
      }
      const result = fib(key);
      redisClient.set(key, result);
      return resp.send("Fibonacci: fib(" + `${key}` + ") = " + `${result}` + "\n");
    } catch (err) {
      console.log(err);
      return resp.status(500);
    }
  });
});

app.get('/', (req, resp) => {
  resp.send('Hello world!!!\n');
});

app.listen(3000, err => {
  console.log('Server listening on port 3000');
});
