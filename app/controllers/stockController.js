var yahooFinance = require('yahoo-finance')
var stocks = []

function StockHandler() {
	
	this.showStocks = function(req, res){
		console.log(stocks)
		if(stocks.length > 0){
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
				symbol: stocks[0],
				from: yearAgoComplete,
				to: todayComplete,
				period: 'd'
			}, function(err, quotes){
				if(err){
					console.error(err)
				}
				if(quotes.length > 0){
					var stockPrice = []
					var stockDate = []
					for(i = 0; i < quotes.length; i++){
						stockPrice.push(quotes[i].close)
						stockDate.push(quotes[i].date)
					}
					res.locals.stockPrice = stockPrice
					res.locals.stockDate = stockDate
					res.locals.stocks = stocks
					res.render('index')

				}
			})
			
		}else{
			res.render('index')
		}
	}

	this.addStock = function(req, res){
		stocks.push(req.body.stock.toUpperCase())
		res.redirect('/')
	}

	this.deleteStock = function(req, res){

	}



}

module.exports = StockHandler