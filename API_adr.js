var express = require("express")/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
const fs = require('fs')
var app = express();


adr = '?q=8+bd+du+port'
features = []

app.get('/names' ,function(req,res){
    var url = "https://api-adresse.data.gouv.fr/search/"+adr.toString()
    fetchUrl(url , function(error, meta, body){
    	re_api = JSON.parse(body)
    	
    	long = re_api.features.length // nombre de ville
    	for (var i = 0; i<long-1 ; i++) {
    		features[i] = re_api.features[i].properties.city
    	} //récuperation de ville ayant l'adr en quetion 
   
        res.write(features.toString())
        res.end()
    })
})

//API


//app.get('/names', function(req,res) {
//	res.format({
//        'application/json': function () {
//            res.json([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
//        },

//        'application/csv': function () {
//            res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
//        }
//    })
//})


app.get('/index', function(req,res) {
    fs.readFile('index.html', function(err, html) {
    if(err){throw err;}
    res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
    })

})

//static ressources


app.listen(3000, function () {
    console.log('Running ma friend')
  });