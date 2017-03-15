var yahooFinance = require('yahoo-finance')
var stocks = ['YHOO']

module.exports = function(app){

	app.get('/', function(req, res){
		var today = new Date()
		var year = today.getFullYear().toString()
		var yearAgo = year - 1
		var month = today.getMonth().toString()
		var day = today.getDate().toString()
		if(month.length < 2){
			month = '0' + month
		}
		if(day.length < 2){
			day = '0' + day
		}
		var todayComplete = year + '-' + month + '-' + day
		var yearAgoComplete = yearAgo + '-' + month + '-' + day

		yahooFinance.historical({
			symbol: 'GOOGL',
			from: yearAgoComplete,
			to: todayComplete,
			period: 'd'
		}, function(err, quotes){
			if(err){
				console.error(err)
			}
			var stockPrice = []
			var stockDate = []
			for(i = 0; i < quotes.length; i++){
				stockPrice.push(quotes[i].close)
				stockDate.push(quotes[i].date)
			}
			res.locals.stockPrice = stockPrice
			res.locals.stockDate = stockDate
			res.render('index')
		})
	})

}