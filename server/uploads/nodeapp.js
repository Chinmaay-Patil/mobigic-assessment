
var express = require('express');  
var app = express();  
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json())    // <==== parse request body as JSON

app.listen(6000)

app.post('/test', (req, res) => {
  res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object
})