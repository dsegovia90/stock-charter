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
		var addedStock = req.body.stock.toUpperCase()
		if(stocks.indexOf(addedStock) < 0){
			var today = new Date()
			var year = today.getFullYear().toString()
			var yearAgo = year - 1
			var month = today.getMonth() + 1
			month = month.toString()
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
				}else{
					res.flash('warning', 'Invalid Stock').redirect('/')
				}
			})

		}else{
			res.flash('warning', 'Can\'t Duplicate Stock').redirect('/')
		}
	}

	this.deleteStock = function(req, res){
		var stockToDel = req.params.id 
		var stockToDelIndex = stocks.indexOf(stockToDel)
		stocks.splice(stockToDelIndex, 1)
		stockPrices.splice(stockToDelIndex, 1)
		if(stocks.length < 1){
			stockDate = []
		}

		res.flash('danger', 'Stock '+ stockToDel +' deleted').redirect('/')

	}



}

module.exports = StockHandler