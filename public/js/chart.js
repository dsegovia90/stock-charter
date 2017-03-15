var ctx = document.getElementById('myChart')

stockPrice = stockPrice.split(',').map(Number)
stockDate = stockDate.split(',')

console.log(stockPrice)
console.log(stockDate)

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: stockDate,
    datasets: [{
      label: 'YHOO',
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