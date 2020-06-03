const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

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

pgClient.on('error', () => {
  console.log('No connection to PG DB');
});

pgClient.query('CREATE TABLE IF NOT EXISTS results(number INT)').catch(err => { 
    console.log(err);
});

console.log(keys);

const nwd = (num1, num2) => {
  var tmp;
  while (num2) {
    tmp = num1 % num2;
    num1 = num2;
    num2 = tmp;
  }
  return num1;
};

const addResult = (value) => {
  return new Promise((resolve, reject) => {
    pgClient
      .query("INSERT INTO results (number) VALUES ($1)", [value])
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  })
}

app.get("/results", (req, resp) => {
  pgClient
    .query("SELECT DISTINCT number FROM results")
    .then((data) => {
      return resp.json(data.rows);
    }).catch((err) => {
      console.log(err);
      return resp.status(500);
    });
});

app.post("/results", (req, resp) => {
  const tmp1 = parseInt(req.body.param1) || 0;
  const tmp2 = parseInt(req.body.param2) || 0;

  var num1, num2;

  if (tmp1 > tmp2) {
    num1 = tmp1;
    num2 = tmp2;
  } else {
    num1 = tmp2;
    num2 = tmp1;
  }

  const key = `${num1},${num2}`;

  redisClient.get(key, async (err, value) => {
    try {
      if (value !== null) {
        await addResult(value);
        return resp.send("Wynik: " + `${value}` + "\n");
      }
      const result = nwd(num1, num2);
      redisClient.set(key, result);
      await addResult(result);
      return resp.send("Wynik: " + `${result}` + "\n");
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
