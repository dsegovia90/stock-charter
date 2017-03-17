
var yahooFinance = require('yahoo-finance')
var stocks = []
var stockPrices = []
var stockDate = []


module.exports = function(app, io){

	app.get('/', function(req, res){
		res.locals.stocks = stocks
		res.render('index')	
	})

	io.on('connection', function(socket){
		console.log('User connected.')

		socket.emit('init', {
						stocks: stocks,
						stockPrices: stockPrices,
						stockDate: stockDate
					})

		socket.on('new stock', function(data){
		var addedStock = data.toUpperCase()
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
						stockDate.push(quotes[i].date.toString().slice(0,10))
					}
					stocks.push(addedStock)
					stockPrices.push(stockPrice)
					io.emit('stock batch', {
						stocks: stocks,
						stockPrices: stockPrices,
						stockDate: stockDate
					})
				}else{
					socket.emit('flash', [ 'warning' , 'Invalid Stock: ' + addedStock ])
				}
			})

		}else{
			socket.emit('flash', [ 'warning' , 'Can\'t Duplicate Stock' ])
		}
	})

		socket.on('delete', function(deleteId){
			var stockToDel = deleteId
			var stockToDelIndex = stocks.indexOf(stockToDel)
			stocks.splice(stockToDelIndex, 1)
			stockPrices.splice(stockToDelIndex, 1)
			if(stocks.length < 1){
				stockDate = []
			}
			io.emit('delete', deleteId, {
				stocks: stocks,
				stockPrices: stockPrices,
				stockDate: stockDate
			})
			socket.emit('flash', [ 'danger' , 'Deleted Stock: ' + stockToDel ])
		})




		socket.on('disconnect', function(){
			console.log('User disconnected.')
		})
	})
}