const express = require('express')

// creation app
const app = express()
const https = require('https')
const server = https.Server(app)
var request = require('request');

// page d'accueil
/*app.get('/', function (req, res) {
	res.setHeader('Content-Type','text/html');
	res.sendFile(__dirname + '/index.html');
})*/
/*
.get('/api/api1/:aliment/:nombre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
	var noms = ['Melon', 'Haricot', 'Navet'];
    res.render('aliments.ejs',{aliment: req.params.aliment, noms: noms, compteur : req.params.nombre});
})*/

const myRouter = express.Router();

// Je vous rappelle notre route (/piscines).
myRouter.route('/piscine')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
	  res.json({message : "Liste toutes les piscines de Lille Métropole", methode : req.method});
})
//POST
.post(function(req,res){
      res.json({message : "Ajoute une nouvelle piscine à la liste", methode : req.method});
})
//PUT
.put(function(req,res){
      res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
})
//DELETE
/*
.delete(function(req,res){
res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});
}); */
myRouter.route('/piscines')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
  request('https://api-adresse.data.gouv.fr/search/?q='+req.query.adresse, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.json({
      message : "Resultat de votre recherche :",
      adresse : req.query.adresse,
      coordonnees :  response.body});
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
   /*res.json({
     message : "Liste les piscines de Lille Métropole avec paramètres :",
     ville : req.query.ville,
     nbResultat : req.query.maxresultat,
     methode : req.method });*/
   // https://127.0.0.1/piscines?ville=Lille&maxresultat=10&method=GET
})//... Suite du code

// Nous demandons à l'application d'utiliser notre routeur


myRouter.route('/')
// all permet de prendre en charge toutes les méthodes.
.all(function(req,res){
      res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
});

app.use(myRouter);

// middleware
/*
app.use(express.urlencoded({ extended: false }));
app.use(express.json())*/
//Use Routes

app.use(express.static(__dirname+'/api/api1'))
app.use(express.static(__dirname+'/api/api2'))



app.listen(8080)
