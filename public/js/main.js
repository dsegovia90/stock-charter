$(document).ready(function(){



	$('#flash_message').on('click', 'article' , function (){
	  $(this).remove()
	})

})

var myChart

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var ctx = document.getElementById('myChart')

$(function() {
	var socket = io()

	$('form').submit(function(e){
		e.preventDefault();
		var stockBox = $('#stock_box').val().toUpperCase()
		$('#stock_box').val('')
		socket.emit('new stock', stockBox)
	})

	$('#stock_list').on('click', '.delete_link', function(){
		var stockIdToDel = $(this).parent().parent().attr('id')
		socket.emit('delete', stockIdToDel)
	})

	socket.on('init', function(data){
		console.log('Init')
		plot(data.stocks, data.stockPrices, data.stockDate)
	})

	socket.on('stock batch', function(data){
		//rerender the chart with all the stocks
		plot(data.stocks, data.stockPrices, data.stockDate)


		//add all stocks to the list
		console.log(data.stocks)
		$('#stock_list').append(
			`<div id='${data.stocks[data.stocks.length-1]}' class='card'>
				<div class='card-header'>
					<p class='card-header-title'>${data.stocks[data.stocks.length-1]}</p>
					<a class='card-header-icon delete_link'>
						<span class='icon'>
							<i class='fa fa-times'></i>
						</span>
					</a>
				</div>
			</div>`
			)
	})

	socket.on('delete', function(deleteId, data){
		$(`#${deleteId}`).remove()
		plot(data.stocks, data.stockPrices, data.stockDate)
	})


	socket.on('flash', function(message){
		$('#flash_message').append(
			`<article class='message is-${message[0]}'>
				<div class='message-header'>
					<p>${message[1]}</p>
					<button class='delete'></button>
				</div>
			</article>`
			)
	})


	function plot(stocks, stockPrices, stockDate){
		var dataSets = []
		for(i=0; i < stocks.length; i++){
			dataSets.push({
				label: stocks[i],
				data: stockPrices[i],
				fill: false,
				borderColor: color[i],
				backgroundColor: color[i]
			})
		}
		if(myChart){
			myChart.destroy()
		}
		myChart = new Chart(ctx, {
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
	}

})


