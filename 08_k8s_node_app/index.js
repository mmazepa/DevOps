const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const random = Math.random();

app.get('/', (req, res) => {
  return res.json(random);
});

app.listen(4000, () => {
  console.log('Service listening on port 4000.');
});
