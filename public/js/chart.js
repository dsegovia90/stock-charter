var ctx = document.getElementById('myChart')

// stockPrice = stockPrice.split(',').map(Number)
// stockDate = stockDate.split(',')
// stocks = stocks.split(',')


var stockPrices = stockPrices.split(',').map(Number)
var stockDate = stockDate.split(',')
var stocks = stocks.split(',')

for(i=0; i<stockDate.length; i++){
	stockDate[i] = stockDate[i].slice(0,15)
}
console.log(stockPrices)
console.log(stockDate)
console.log(stocks)


var dataSets = []

for(i = 0; i < stocks.length; i++){
	var stockPriceSliced = stockPrices.slice(i*stockDate.length, (i+1)*stockDate.length)
	dataSets.push({
		label: stocks[i],
		data: stockPriceSliced,
		fill: false,
	  borderColor: color[i],
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
  	hover: 
  	{
  		mode: 'index'
  	},
  	tooltips: 
  	{
  		mode: 'index', 
  		position: 'nearest'
  	},
  	elements:
  	{
  		point: 
  		{
  			radius: 0,
  			hitRadius: 5,
  			hoverRadius: 5
  		}
  	},
  	scales:
  	{
  		xAxes: [{
  			display: true
  		}]
  	}
  }
})