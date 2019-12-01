const port = process.env.PORT || 3000

var express = require("express")/* npm install express */
var csv = require('csv-express')/* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var cors = require('cors');
var ejs = require('ejs');

const fs = require('fs')
var ville = ""
var cp = ""
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors());


// Page d'acceuil On revoit la page html --------------------------------
app.get('/', function (req, res) {
        res.setHeader('Content-Type','text/html');
        res.sendFile(__dirname + '/index.html');
})

app.get('/index', function(req,res) {
   
    fs.readFile('index.html', function(err, html) {
    if(err){throw err;}
    res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(html)
        res.end()

})
})


// Ici on recupere les données du formulaire qui seront enreigstrées dans des variables globales ---------
app.get('/form', function(req, res) {
    
    console.log("on est form")
     ville = req.query.Vname
     cp = req.query.cp
     
     res.redirect('/')
    
})


app.get('/laboratoire' ,function(req,res){

    //param = '?dataset=laboratoires_de_biologie_medicale&facet=cp_ville&refine.cp_ville=' // Param API
    
    console.log("on est au labo")
    console.log(ville)
    console.log(cp)
   

    const center_med ={
        Adresse_lab:String,
        Nom_lab:String
    }
    
        li_med = []
    
        if(cp!="" & ville!=""){
            var url ='https://data.iledefrance.fr/api/records/1.0/search/?dataset=laboratoires_de_biologie_medicale&rows=823&facet=cp_ville&refine.cp_ville='+cp+'+'+ville.toUpperCase() //url API + param pour requete
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
         

        }else {
            console.log("tous les laboratoire")
            var url ='https://data.iledefrance.fr/api/records/1.0/search/?dataset=laboratoires_de_biologie_medicale&rows=823'
            fetchUrl(url , function(error, meta, body){
        
                jsonAnswer = JSON.parse(body)

                res.format({
                    'application/json': function () {
                  res.json(jsonAnswer)
                  },
                      'application/csv': function () {
                  res.csv(jsonAnswer)
                  }})

                  res.end()
        
        
     
    })
}
})

app.get('/medecin' ,function(req,res){


    console.log("on est au medecin")
    console.log(ville)
    console.log(cp)

    const medcin = {
        name:String,
        tel:String,
        profession: String,
        commune : String
		
    }
    meds = []
    if(cp!="" & ville!=""){
    var url = "https://data.iledefrance.fr/api/records/1.0/search/?dataset=annuaire-et-localisation-des-professionnels-de-sante&rows=10000&facet=code_postal&facet=nom_com&refine.code_postal="+cp+"&refine.nom_com="+ville
    fetchUrl(url , function(error, meta, body){
        
        jsonAnswer = JSON.parse(body)
       
        for(var i=0; i<jsonAnswer.nhits;i++){
            var med = {}
            med.nom = jsonAnswer.records[i].fields.nom
            med.tel = jsonAnswer.records[i].fields.telephone
            med.profession = jsonAnswer.records[i].fields.libelle_profession
            med.commune = jsonAnswer.records[i].fields.nom_com
            meds.push(med)
        }

        res.format({
            'application/json': function () {
          res.json(meds)
          },
              'application/csv': function () {
          res.csv(meds)
          }})

        //console.log(JSON.stringify(meds))
        //res.write(meds)
        //res.json(meds);
        res.end()

       
      })
           
           
    }else{
        console.log("tous les medecins")
        var url ='https://data.iledefrance.fr/api/records/1.0/search/?dataset=annuaire-et-localisation-des-professionnels-de-sante&rows=1000'
        fetchUrl(url , function(error, meta, body){
    
            jsonAnswer = JSON.parse(body)

            res.format({
                'application/json': function () {
              res.json(jsonAnswer)
              },
                  'application/csv': function () {
              res.csv(jsonAnswer)
              }})

              res.end()
    
            })
      }
   
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

app.get('/codepostale', function(req,res){
	//var ville = req.params.ville;
	var url = "https://data.iledefrance.fr/api/records/1.0/search/?dataset=annuaire-et-localisation-des-professionnels-de-sante&rows=10000&facet=code_postal&facet=nom_com&refine.nom_com="+ville;

	//console.log(url);
	fetchUrl(url, function(error, meta, body){
		nbrdemedecin =  JSON.parse(body);
		//console.log(codepostale.records);
        res.json(nbrdemedecin.nhits);
        console.log(nbrdemedecin.nhits)
        
    });

});



app.listen(port, function () {
    console.log('Running')
  });