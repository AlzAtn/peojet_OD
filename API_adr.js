var express = require("express")/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl

const fs = require('fs')

var app = express();

app.get('/', function (req, res) {
    res.send('Hello, vous êtes sur le serveur tah les MIASHS ! allez voir /index')
  })

//API

app.get('/user/:name', function(req, res) {
	var age=''+req.query.age;
	if(age!=="undefined" && age.trim().length){
	res.send('Hello '  + req.params.name + ' tu as ' + age +' ans');
	}else{
	(res.send('Hello '  + req.params.name));
	}
})

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

const medcin = {
    name:String,
    tel:String,
    profession: String,
    commune : String
}
 
meds = []

var ville = "Aulnay-sous-Bois"
var cp = "93600"
app.get('/names' ,function(req,res){
    var url = "https://data.iledefrance.fr/api/records/1.0/search/?dataset=annuaire-et-localisation-des-professionnels-de-sante&rows=10000&facet=code_postal&facet=nom_com&refine.code_postal="+cp+"&refine.nom_com="+ville
    fetchUrl(url , function(error, meta, body){
        jsonAnswer = JSON.parse(body)
        console.log(jsonAnswer.nhits)
        for(var i=0; i<jsonAnswer.nhits;i++){
            //console.log(i)
            //console.log(jsonAnswer.records[i].fields.nom)
            var med = {}
            med.nom = jsonAnswer.records[i].fields.nom
            med.tel = jsonAnswer.records[i].fields.telephone
            med.profession = jsonAnswer.records[i].fields.libelle_profession
            med.commune = jsonAnswer.records[i].fields.nom_com
            meds.push(med)
        }

        
        res.format({
            'application/json': function () {
        res.json(meds);
         } })

         res.format({
            'application/csv': function () {
        res.csv(meds);
         } })

        //console.log(JSON.stringify(medcin))
        //res.write(jsonAnswer.toString())
        res.end()
    })
})

//static ressources

app.get('/index', function(req,res) {
	fs.readFile('index.html', function(err, html) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
	})

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });