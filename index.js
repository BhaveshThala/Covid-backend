const express = require('express')
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function plasma(data) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("Plasma").insertOne(data, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
  return true
}

function oxygen(data) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("Oxygen").insertOne(data, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
  return true
}


app.listen(9000, () => console.log("server started at 9000"))

app.get('/', (req, res, next) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("Plasma").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
      return result
    });
  });
})

app.post('/plasma', (req, res, next) => {
  let status = plasma(req.body)
  if (status) {
    console.log("Sending Plasma")
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Covid");
      dbo.collection("Plasma").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
        db.close();
      });
    });
  }
})

app.get('/oxy', (req, res, next) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Covid");
    dbo.collection("Oxygen").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
})

app.post('/oxygen', (req, res, next) => {
  let status = oxygen(req.body)
  if (status) {
    console.log("Sending Oxygen")
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Covid");
      dbo.collection("Oxygen").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
        db.close();
      });
    });
  }
})