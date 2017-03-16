var ctx = document.getElementById('myChart')

// stockPrice = stockPrice.split(',').map(Number)
// stockDate = stockDate.split(',')
// stocks = stocks.split(',')


var stockPrices = stockPrices.split(',').map(Number)
var stockDate = stockDate.split(',')
var stocks = stocks.split(',')
console.log(stockPrices)
console.log(stockDate.length)
console.log(stocks)

var dataSets = []

for(i = 0; i < stocks.length; i++){
	var stockPriceSliced = stockPrices.slice(i*stockDate.length, (i+1)*stockDate.length)
	dataSets.push({
		label: stocks[i],
		data: stockPriceSliced,
	  backgroundColor: color[i]
	})
}

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: stockDate,
    datasets: dataSets
  },
  options:
  {
  	scales:
  	{
  		xAxes: [{
  			display: false
  		}]
  	}
  }
})