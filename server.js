var express = require('express')
var routes = require('./app/routes/index.js')

var bodyParser = require('body-parser')


var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', './app/views')

app.use(express.static('./public'))

routes(app)

var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log('Listening on port ' + port + '...')
})