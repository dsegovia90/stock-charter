$(document).ready(function(){

	$('#stock_form').submit(function(e){
		e.preventDefault();
	})

	$('#flash_message').on('click', 'article' , function (){
	  $(this).remove()
	})

})


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


$(function() {
	var socket = io()

	$('form').submit(function(){
		var stockBox = $('#stock_box').val().toUpperCase()
		$('#stock_box').val('')
		socket.emit('new stock', stockBox)
	})

	$('#stock_list').on('click', '.delete_link', function(){
		var stockIdToDel = $(this).parent().parent().attr('id')
		socket.emit('delete', stockIdToDel)
	})






	socket.on('stock batch', function(data){
		//rerender the chart with all the stocks

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

	socket.on('delete', function(deleteId){
		$(`#${deleteId}`).remove()
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


})


