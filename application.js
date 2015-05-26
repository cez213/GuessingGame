$(document).ready(function(){

	// generate random number to be guessed
	var number = Math.floor((Math.random()*100)+1);
	//alert(number);

	// counter for number of guesses remaining
	var counter = 0;

	// function for refreshing game
	var restart = function(){
		// reset number of guesses and input field
		counter = 0;
		previousGuess = [];
		$('.message').text('5 Guesses Remaining');
		$('.form-control').val('');
		$('#responseMessage').text('').css({'color': '#66FF99', 'font-size':'16px', 'font-weight': '200'});
		$('#message').text('');
		// generate new random number to be guessed
		number = Math.floor((Math.random()*100)+1);
		//alert(number);
	}
	
	var previousGuess = [];

	// response function
	var responseFunc = function(){
		// get user inputted number and compare to random number
		var userNumber = +$('.form-control').val();
		previousGuess.push(userNumber);

		var response = "";

		if(userNumber <= 100 && userNumber >= 1 && counter<4){
			if(userNumber === number){
				response = "You Win!";
				$('#responseMessage').text(response).css({'color': '#FF0066', 'font-size':'40px', 'font-weight': 'bold'});
			}else if(userNumber > number && userNumber <= (number+5)){
				response = "You are SUPER HOT, Guess Lower";
			}else if(userNumber > number && userNumber <= (number+10)){
				response = "You are HOT, Guess Lower";
			}else if(userNumber > number){
				response = "You are ICE COLD, Guess Lower";
			}else if(userNumber < number && userNumber >= (number-5)){
				response = "You are SUPER HOT, Guess Higher";
			}else if(userNumber < number && userNumber >= (number-10)){
				response = "You are HOT, Guess Higher";
			}else{
				response = "You are ICE COLD, Guess Higher";
			}
		}else if(counter === 5 && userNumber === number){
			response = "You Win!";
			$('#responseMessage').text(response).css({'color': '#FF0066', 'font-size':'40px', 'font-weight': 'bold'});
		}else if(counter >= 4 && userNumber !== number){
			response = "Game Over";
			$('#responseMessage').text(response).css({'color': '#FF0066', 'font-size':'40px', 'font-weight': 'bold'});
		}else{
			response = "Incorrect Input";
			counter--;
		}

		// adjust message showing number of guesses remaining
		counter++;
		numOfGuesses = 5 - counter;

		if(numOfGuesses < 0){
			$('.message').text('0 Guesses Remaining');
		}else{
			$('.message').text(numOfGuesses+ ' Guesses Remaining');
		}

		// update feedback regarding user's guess
		$('#responseMessage').text(response);

		// add user input to previous guess list
		for(var i = 0; i < previousGuess.length; i++){
			if(response === "Incorrect Input"){
				compareGuesses = "Invalid Number";
			}else if(i === 0 && (Math.abs(userNumber-number) <= 10)){
				compareGuesses = "Hot";
			}else if(userNumber === number){
				compareGuesses = "Hooray!";
			}else if(Math.abs(previousGuess[i] - number) < Math.abs(previousGuess[i-1] - number)){
				var compareGuesses = "Hotter";
			}else if(previousGuess[i] === previousGuess[i-1]){
				compareGuesses = "Try a New Number";
			}else if(Math.abs(previousGuess[i] - number) > Math.abs(previousGuess[i-1] - number)){
				compareGuesses = "Colder";
			}else{
				compareGuesses = "Cold";
			}
		}
		$('#message').append(userNumber + ' ' + compareGuesses + '<br>');

		// clear user input field before next guess
		$('.form-control').val('');
	}

	// actions that occur after mouse clicks 'submit'
	$('.inner').on('click', '.btn', responseFunc);

	// actions that occur after enter button is used
	$('.inner').keypress(function(event){
		if(event.keyCode == 13){
			responseFunc();
		}
	});

	// restart game
	$('.nav').on('click', '#newGame', restart);

	// hint button
	$('.nav').on('click', '#hint', function(){
		$('#responseMessage').text(number);
	});

});








