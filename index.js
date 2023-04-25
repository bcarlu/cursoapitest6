require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let dataShortener = []

app.post('/api/shorturl', function(req, res) {
  if (req.body.url == "") {
    res.json({ error: 'invalido'})
  }

  try{
    let url = new URL(req.body.url)
    let obj = { original_url : url.href, short_url : Math.floor(Math.random() * 10000)}
    dataShortener.push(obj)
    res.json(obj);
  } catch {
    res.json({ error: 'invalid url'})
  }
  /** ## to do: Validate if url was already shortened */ 
});

app.get('/api/shorturl/:id', function(req, res) {
  let id = req.params.id
  let reqUrl = dataShortener.filter((value) => { return value.short_url == id})
  res.redirect(reqUrl[0].original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
