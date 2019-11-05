var express = require("express");/* npm install express */
var csv = require('csv-express');/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var convert = require('xml-js');
var request = require('request');
var https = require('https');
var jsonexport = require('jsonexport');


var app = express()
const server = https.Server(app)
const myRouter = express.Router()

/*
app.get('/', function (req, res) {
    res.send('Hello World!')
  })

app.get('/user/:name', function(req, res) {
	var age=''+req.query.age;
	if(age!=="undefined" && age.trim().length){
	res.send('Hello '  + req.params.name + ' tu as ' + age +' ans');
	}else{
	(res.send('Hello '  + req.params.name));
	}
})*/

app.get('/index', function(req,res) {
	fs.readFile('index.html', function(err, html) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
	})

})

myRouter.route('/geolocalisation')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET

.get(function(req,res){
  request('https://api-adresse.data.gouv.fr/search/?q='+req.query.adresse, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
	// Print the response status code if a response was received
	console.log(typeof(JSON.parse(body)));
	var options = {compact: true, ignoreComment: true, spaces: 4};
    res.json({
		message : "Resultat de votre recherche :",
		adresse : req.query.adresse,
		coordonnees : JSON.parse(body,options)
	});
	console.log('body:', body); // Print the HTML for the Google homepage.
	result = convert.js2xml({a:"b",c:"d"});
	console.log(result);

app.get('/names', function(req,res) {
	res.format({
        'application/json': function () {
            res.json([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
        },

        'application/csv': function () {
            res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
        }
    })
})
app.use(myRouter);
/*app.get('/page', function(request, response) {
  var p1 = request.param("p1"); 
  console.log(p1);
  response.sendFile( __dirname  + '/page');
});*/

/*server.post('/post', function(request, response) {
  var p1 = request.body.p1; 
  console.log("p1=" + p1);
});*/

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });