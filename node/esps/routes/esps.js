const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post("/postdht", (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

module.exports = app;
