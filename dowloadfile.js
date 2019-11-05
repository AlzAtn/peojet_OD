<!-- views/index.ejs -->
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>contentNegociation</title>
    <meta descr="">
   
</head>
<body>
        <button type="button" id="jsonbtn">JSON</button>
        <button type="button" id="csvbtn">CSV</button>
		<button type="button" id="jsondwl">Download JSON</button>
        
        <h3>debug</h3>

    <div id="response">
        data : <div id=datacontent><%= JSON.stringify(data.json)%></div>
    </div>

</body>
</html>

<script>
jsonbtn = document.getElementById("jsonbtn")
csvbtn = document.getElementById("csvbtn")
jsondwl = document.getElementById("jsondwl")

function fetchehpadjson(route)
{
    fetch(route, 
                {
                    method: 'GET',
                    headers: { 'accept' : 'application/json'}
                }
            ).then(function(response){
                response.json().then(function(data)
                {
                    document.getElementById("datacontent").innerHTML = JSON.stringify(data)
                })
            })
}
function fetchehpadcsv(route)
{
    fetch(route, 
                {
                    method: 'GET',
                    headers: { 'accept' : 'application/csv'}
                }
            ).then(function(response){
                response.blob().then(function(datablob)
                {
                    datablob.name = 'newfile.csv'
                    anchor = document.createElement('a')
                    anchor.download = datablob.name
                    anchor.href = window.URL.createObjectURL(datablob)
                    anchor.dataset.downloadurl = ['application/csv', anchor.download, anchor.href].join(':')
                    anchor.click()
                })
            })
}

function fetchehdwljson(route)
{
    fetch(route, 
                {
                    method: 'GET',
                    headers: { 'accept' : 'application/json'}
                }
            ).then(function(response){
                response.blob().then(function(datablob)
                {
                    datablob.name = 'newfile.json'
                    anchor = document.createElement('a')
                    anchor.download = datablob.name
                    anchor.href = window.URL.createObjectURL(datablob)
                    anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':')
                    anchor.click()
                })
            })
}

jsonbtn.onclick = function()
{
    console.log("clicked on json")
    fetchehpadjson(`/names`)
}
csvbtn.onclick = function()
{
    console.log("clicked on csv")
    fetchehpadcsv(`/names`)   
}

jsondwl.onclick = function()
{
    console.log("clicked on json")
    fetchehdwljson(`/names`)
}
</script>