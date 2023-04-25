var express = require('express');
var router = express.Router();

const axios = require("axios");
const { response } = require('../app');
const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: 'boston'},
  headers: {
    'X-RapidAPI-Key': '778925571emsha7b6698ecb4fb3fp13862ejsn53a368b3c809',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

let weatherData = [];
let cities = ['nyc', 'la', 'houston', 'boston'];

for (let i = 0; i < cities.length; i++) { 
  options['params']['q'] = cities[i];
  axios.request(options).then(function (response) {
    weatherData.push(response.data)
  }).catch(function (error) {
    res.send(error);
  });
} 

let myPromise = new Promise(function(myResolve, myReject) {
  axios.request(options).then(function (response) {
    myResolve(response.data)
  }).catch(function (error) {
    myReject(error)
  });
});

function displayer(data, res) {
  res.render('weather', { title: data['location']['name'], temp: data['current']['temp_f'] });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/promises', function(req, res) { 
  // myResolve(res.render('weather', { title: value['location']['name']}, {temp: value['current']['temp_f'] }));
  myPromise.then(
    function(value) {displayer(value, res)},
    function(error) {res.send(error);}
  );
});

router.post('/async', function(req, res) {
  async function getData() {
    let value = await myPromise;
    return displayer(value, res)
  }
  getData();
});

router.post('/callback', function(req, res) {
  async function getData(callback) {
    let value = await myPromise;
    return callback(value, res)
  }
  getData(displayer);
});

router.post('/weather', function(req, res) {
  options['params']['q'] = req.body["city"];
  axios.request(options).then(function (response) {
    displayer(response.data, res)
  }).catch(function (error) {
    res.send(error);
  });
});

router.get('/weather', function(req, res) {
  axios.request(options).then(function (response) {
    displayer(response.data, res)
  }).catch(function (error) {
    res.send(error);
  });
});

router.get('/data', function(req, res) {
  res.send(weatherData)
});

router.get('/edit', function(req, res){
  res.render('edit-form');
});

router.get('/angular', function(req, res){
  res.render('frontend/src/app/app.component');
});

module.exports = router;