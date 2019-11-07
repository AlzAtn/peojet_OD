const port = process.env.PORT || 3000

var express = require("express")/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var cors = require('cors');

const fs = require('fs')

var app = express();
app.use(cors());


app.get('/', function (req, res) {
    res.send('Hello, vous êtes sur le serveur tah les MIASHS ! allez voir /index')
  })


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
            

        res.end()
    })
})




app.get('/test' ,function(req,res){

    var ville = "Aulnay-sous-Bois"
    var cp = "93600"

    const medcin = {
        name:String,
        tel:String,
        profession: String,
        commune : String
    }
     
    meds = []



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

// CSS
app.get('/css/mainStyle.css', function(req,res) {
	fs.readFile('css/mainStyle.css', function(err, css) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(css)
            res.end()
	})
})
// CSS  2
app.get('/css/materialize.min.css', function(req,res) {
	fs.readFile('css/materialize.min.css', function(err, css) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(css)
            res.end()
	})
})

// CSS js
app.get('/js/materialize.min.js', function(req,res) {
	fs.readFile('js/materialize.min.js', function(err, js) {
	if(err){throw err;}
	res.writeHead(200, {'Content-Type': 'text/js'})
            res.write(js)
            res.end()
	})
})



app.listen(port, function () {
    console.log('Running')

  });