var ctx = document.getElementById('myChart')

console.log(stockPrice)
console.log(stockDate)

var myChart = new Chart(ctx, {
	type: 'line', 
	data: stockPrice
})