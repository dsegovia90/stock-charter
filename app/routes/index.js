var StockController = require('../controllers/stockController.js')
var stockController = new StockController()



module.exports = function(app){

	app.get('/', stockController.showStocks)

	app.post('/', stockController.addStock)

}