var express = require("express");/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl

const fs = require('fs')

var app = express();
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

app.get('/city' ,function(req,res){
    var url="https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&limit=15";
    fetchUrl(url , function(error, meta, body){
		json = JSON.parse(body);
        res.write(json.features[0].properties.city)
        res.end()
    })
})

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

app.get('/page', function(request, response) {
  var p1 = request.param("p1"); 
  console.log(p1);
  response.sendFile( __dirname  + '/page');
});

server.post('/post.html', function(request, response) {
  var p1 = request.body.p1; 
  console.log("p1=" + p1);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });