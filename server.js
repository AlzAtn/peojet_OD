const express = require('express')

// creation app
const app = express()
const https = require('https')
const server = https.Server(app)
var request = require('request');

// page d'accueil
app.get('/', function (req, res) {
	res.setHeader('Content-Type','text/html');
	res.sendFile(__dirname + '/index.html');
})

app.listen(8080)