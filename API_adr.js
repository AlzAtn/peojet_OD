<<<<<<< Updated upstream
=======
const port     = process.env.PORT || 3000

>>>>>>> Stashed changes
var express = require("express")/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
const fs = require('fs')
var app = express();


<<<<<<< Updated upstream
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
=======

app.get('/names' ,function(req,res){

param = '?dataset=laboratoires_de_biologie_medicale&facet=cp_ville&refine.cp_ville=78190+TRAPPES' // Param API

const center_med ={
    Adresse_lab:String,
    Nom_lab:String
}
    
    li_med = []

    var url ='https://data.iledefrance.fr/api/records/1.0/search/'+param.toString() //url API + param pour requete
    fetchUrl(url , function(error, meta, body){

        re_api = JSON.parse(body)
        
            for (var i = 0; i< re_api.nhits ; i++) { // boucle pour recuprer all cabinet
                var lab = {}
                lab.Adresse_lab = re_api.records[i].fields.adresse_complete
                lab.Nom_lab = re_api.records[i].fields.raison_sociale

                li_med.push(lab)
            }
                res.format({
                  'application/json': function () {
                res.json(li_med)
                },
                    'application/csv': function () {
                res.csv(li_med)
                }})
             
        //res.write(tab.toString()) //afficher la concatenation
>>>>>>> Stashed changes
        res.end()
    })
})

<<<<<<< Updated upstream
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

=======
// app.get('/names', function(req,res) {
// 	res.format({
//         'application/json': function () {
//             res.json([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
//         },

//         'application/csv': function () {
//             res.csv([{name : 'toto'}, {name : 'baptiste'}, {name : 'gabriel'}]);
//         }
//     })
// })
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    console.log('Running ma friend')
=======
    console.log('Running')
>>>>>>> Stashed changes
  });