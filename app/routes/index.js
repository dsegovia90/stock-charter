var StockController = require('../controllers/stockController.js')
var stockController = new StockController()



module.exports = function(app, io){

	app.get('/', stockController.showStocks)

	app.post('/', stockController.addStock)

	app.get('/delete/:id', stockController.deleteStock)

	io.on('connect', function(socket){
		console.log('User connected.')
		io.on('disconnect', function(){
			console.log('User disconnected.')
		})
	})
}