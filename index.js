require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require("body-parser")
var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

// Basic Configuration
const port = process.env.PORT || 3000;

let site = [];

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  let url = req.body.url;
  if(!url.match(regex))
  {
    res.send({ error: 'invalid url' })
    return
  }
  site.push(req.body.url)
  res.send({original_url : req.body.url, short_url : site.indexOf(req.body.url, -1)})
});

app.get('/api/shorturl/:id', function(req, res) {
  res.redirect(301, site[req.params.id]);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
