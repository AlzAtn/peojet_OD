var express = require('express')
var app = express()

var url = 'https://services9.arcgis.com/7Sr9Ek9c1QTKmbwr/arcgis/rest/services/mesures_occitanie_72h_poll_princ/FeatureServer/0/query?'

app.get(url, function (req, res) {
    res.send('Hello World!')
  })

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })