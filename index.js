var express = require("express");/* npm install express */
var csv = require('csv-express');/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
//var convert = require('xml-js');
var request = require('request');
var https = require('https');
const fs = require('fs')
//var jsonexport = require('jsonexport');


var app = express()
const server = https.Server(app)
const myRouter = express.Router()


app.get('/index', function(req,res) {
	fs.readFile('index.html', function(err, html) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
	});

});

myRouter.route('/geolocalisation')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET

.get(function(req,res){
  request('https://api-adresse.data.gouv.fr/search/?q='+req.query.adresse, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
	// Print the response status code if a response was received
	console.log(typeof(JSON.parse(body)));
    res.json({
		message : "Resultat de votre recherche :",
		adresse : req.query.adresse,
		coordonnees : JSON.parse(body)
	});
	console.log('body:', body); // Print the HTML for the Google homepage.
  })
});
  
	
app.get('/names', function(req,res) {
	res.format({
        'application/json': function () {
			
			request('https://api-adresse.data.gouv.fr/search/?q='+req.query.adresse, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode);
			// Print the response status code if a response was received
			console.log(typeof(JSON.parse(body)));
			res.json({
				message : "Resultat de votre recherche :",
				adresse : req.query.adresse,
				coordonnees : JSON.parse(body)
	});
	console.log('body:', body); // Print the HTML for the Google homepage.
  })
			
        },

        'application/csv': function () {
            res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
        }
    });
});
	
app.use(myRouter);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });