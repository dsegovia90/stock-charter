var ctx = document.getElementById('myChart')

stockPrice = stockPrice.split(',').map(Number)
stockDate = stockDate.split(',')
stocks = stocks.split(',')

console.log(stockPrice)
console.log(stockDate)
console.log(stocks)

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: stockDate,
    datasets: [{
      label: stocks,
      data: stockPrice,
      backgroundColor: "rgba(153,255,51,0.4)"
    }]
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