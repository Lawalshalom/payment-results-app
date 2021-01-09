const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
const request = require("request");
const { error } = require('console');
const { type } = require('os');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));


dotenv.config();

app.get("/api/rates", (req, res) => {
  const { base, currency } = req.query;
  if (!base || !currency){
    return res.status(400).json({error: "Base and Currency queries are required"})
  }
  if (typeof base !== "string" || typeof currency !== "string"){
    return res.status(400).json({error: "Base and Currency queries must be strings"})
  }

  request(`https://api.exchangeratesapi.io/latest?base=${base.toUpperCase()}&symbols=${currency.toUpperCase()}`,
  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { base, date, rates } = JSON.parse(body);
        const result = {
          results: {
            base,
            date,
            rates
          }
        }
        res.status(200).json(result);
      }
      else res.status(400).json({error:"Null data, enter input parameters correctly"});
    })
})

// Not found middleware
app.use((req, res) => {
  res.status(404).type('text').send('Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});