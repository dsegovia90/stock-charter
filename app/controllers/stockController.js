var yahooFinance = require('yahoo-finance')
var stocks = []
var stockPrices = []
var stockDate = []

function StockHandler() {
	
	this.showStocks = function(req, res){
		// console.log(stocks)
		// console.log(stockPrices)
		// console.log(stockDate)
		res.locals.stocks = stocks
		res.locals.stockPrices = stockPrices
		res.locals.stockDate = stockDate
		res.render('index')	
	}

	this.addStock = function(req, res){
		var addedStock = req.body.stock
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
			symbol: addedStock,
			from: yearAgoComplete,
			to: todayComplete,
			period: 'd'
		}, function(err, quotes){
			if(err){
				console.error(err)
			}
			if(quotes.length > 0){
				var stockPrice = []
				stockDate = []
				for(i = 0; i < quotes.length; i++){
					stockPrice.push(quotes[i].close)
					stockDate.push(quotes[i].date)
				}
				stocks.push(addedStock)
				stockPrices.push(stockPrice)
				res.redirect('/')

			}
		})
	}

	this.deleteStock = function(req, res){

	}



}

module.exports = StockHandler