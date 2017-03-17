var express = require('express')
var routes = require('./app/routes/index.js')

var bodyParser = require('body-parser')


var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', './app/views')

app.use(express.static('./public'))

var session = require('express-session')
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}))
app.use(require('flash')())




routes(app, io)

var port = process.env.PORT || 3000
server.listen(port, function(){
	console.log('Listening on port ' + port + '...')
})