var yahooFinance = require('yahoo-finance')
var stocks = ['YHOO']

module.exports = function(app){

	app.get('/', function(req, res){
		yahooFinance.historical({
			symbol: 'AAPL',
			from: '2012-12-27',
			to: '2012-12-31',
			period: 'd'
		}, function(err, quotes){
			var stockPrice = []
			var stockDate = []
			for(i = 0; i < quotes.length; i++){
				stockPrice.push(quotes[i].close)
				stockDate.push(quotes[i].date)
			}
			console.log(stockPrice)
			res.locals.stockPrice = stockPrice
			res.locals.stockDate = stockDate
			res.render('index')
		})
	})

}